/* eslint-disable @typescript-eslint/no-empty-interface */

import { camelize, isFunction } from "./utils";

export interface PostMessageArgs {
	action: string;
	data: string;
	callbackid?: string;
}

export type HandleFn = (...args: any[]) => void;

export interface CustomActions {}

export interface BridgeActions extends CustomActions {
	/**
	 * 自定义监听操作
	 */
	on: (action: string) => BridgeActions;
	/**
	 * 自定义action包装
	 *
	 *  note: `action` 不支持的名称列表 `on`、`add`、`h5Invoke`、`invokeH5`
	 *
	 * @param action 操作名称
	 */
	wrap: (action: string, handler?: HandleFn) => BridgeActions;
	/**
	 * 宿主内去调用H5的操作或者回调
	 *
	 * @export
	 * @param actionOrCbId 操作名称或者回调id
	 * @param dataJSON json数据串
	 * @param err 异常信息
	 * @returns
	 */
	invokeH5: (actionOrCbId: string, dataJSON?: string | Record<string, any>, err?: string) => void;
	/**
	 *
	 * 客户端向宿主发送信息
	 *
	 * note: 当前操作如果是异步的或者是需要等待宿主返回结果,只需要通过callbackid即可实现匹配
	 *
	 * @param message - 消息内容
	 * @property {string} message.action 客户端期望执行的操作
	 * @property {string} message.data 此次操作需要携带的数据
	 * @property {string} message.[callbackid] 与当前操作对应的唯一回调事件id
	 *
	 */
	postMsg: (message: PostMessageArgs) => void;
	/**
	 *
	 * 扩展 `客户端向宿主发送信息` 的处理器
	 *
	 * note: 当前操作如果是异步的或者是需要等待宿主返回结果,只需要通过callbackid即可实现匹配
	 *
	 * @param handle - 消息处理器
	 * @property {string} message.action 客户端期望执行的操作
	 * @property {string} message.data 此次操作需要携带的数据
	 * @property {string} message.[callbackid] 与当前操作对应的唯一回调事件id
	 */
	use?: (handle: (message: PostMessageArgs) => void) => BridgeActions;
	/**
	 * 记录宿主调用H5的action时的一些debug信息
	 *
	 * @param action 操作名称
	 * @param payload 待记录的信息
	 * @property {string} payload.data 操作携带的数据信息
	 * @property {any} payload.err 操作执行引起的异常信息
	 */
	debug?: (action: string, payload: { data?: any; err?: any }) => void;

	[x: string]: any;
}

const PROP_CONFIG = { configurable: false };

export const actions = {} as BridgeActions;

export type ListenerHandler = (data?: string | Record<string, any>, ex?: Error) => void;

const listeners = {} as Record<string, ListenerHandler>;

export interface ListenerActionCallbackArgs<D> {
	success?: (data?: D) => void;
	error?: (ex: string) => void;
}

/**
 *
 * 获取监听事件对应的回调处理
 *
 * @param action 监听事件名称
 */
export const getListener = (action: string) => listeners[action];
/**
 * 监听宿主发出的事件
 *
 * @export
 * @param action 监听事件名称
 */
export function on(action: string) {
	/* istanbul ignore if */
	if (!action) return;
	const realAction = camelize(`on.` + action);
	actions[realAction] = <D extends Record<string, any>>(args?: ListenerActionCallbackArgs<D>) => {
		listeners[action] = (data?: D, ex?: Error): void => {
			if (ex) {
				args && args.error && args.error(ex.message);
				return;
			}
			try {
				args && args.success && args.success(data);
			} catch (err) {
				args && args.error && args.error(err.message);
			}
		};
	};
}

/* istanbul ignore next */
add("on", (action: string) => {
	on(action);
	return actions;
});

/**
 * 将各种action加入进来
 *
 * @export
 * @param action 操作名称
 * @param handler 操作回调
 */
export function add<T extends HandleFn>(action: string, handler: T): void {
	const names = action.split(".");

	let name = names.shift();

	/* istanbul ignore if */
	if (!name || !isFunction(handler)) return;

	if (!names.length) {
		actions[name] = handler;
		Object.defineProperty(actions, name, PROP_CONFIG);
		return;
	}

	let kv = actions[name] || (actions[name] = {});
	Object.defineProperty(actions, name, PROP_CONFIG);

	while (!!(name = names.shift())) {
		kv[name] = names.length ? (kv = {}) : handler;
		Object.defineProperty(kv, name, PROP_CONFIG);
	}
}

const postMessageHandlers = [] as ((message: PostMessageArgs) => void)[];

add("postMsg", (message: PostMessageArgs) => {
	postMessageHandlers && postMessageHandlers.length && postMessageHandlers.forEach(handler => handler(message));
});

add("use", (fn: (message: PostMessageArgs) => void) => {
	postMessageHandlers.push(fn);
	return actions;
});
