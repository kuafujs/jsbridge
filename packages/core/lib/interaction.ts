import { actions, getListener, HandleFn, ListenerHandler } from "./actions";

const cbBuckets: Record<string, ListenerHandler> = {};

/**
 * 创建回调的id
 *
 * @param {string} action 该回调绑定的操作action名称
 * @returns {string}
 */
function cbId(action: string): string {
	return `cb_${action}_${new Date().getTime()}`;
}

/**
 * H5通知宿主执行交互操作
 *
 * @export
 * @param action 操作名称
 * @param params 执行操作携带的数据
 * @param cb 操作完成后的回调
 */
export function h5Invoke(action: string, params?: Record<string, any>, cb?: HandleFn): void {
	let callbackid = "";

	cb && (cbBuckets[(callbackid = cbId(action))] = cb);

	const payload = {
		action,
		data: params ? JSON.stringify(params) : "",
		callbackid
	};

	actions.debug && actions.debug(action, { data: payload });

	actions.postMsg(payload);
}

/**
 * 宿主内去调用H5的操作或者回调
 *
 * @export
 * @param actionOrCbId 操作名称或者回调id
 * @param dataJSON json数据串
 * @param err 异常信息
 * @returns
 */
export function invokeH5(actionOrCbId: string, dataJSON?: string | Record<string, any>, err?: string): void {
	/* istanbul ignore if */
	if (!actionOrCbId) return;

	const handler = cbBuckets[actionOrCbId] || getListener(actionOrCbId);

	/* istanbul ignore if */
	if (!handler) return;

	if (err) return handler(dataJSON, new Error(err));

	try {
		handler(typeof dataJSON === "string" ? JSON.parse(dataJSON) : dataJSON);
	} catch {
		handler(dataJSON);
	}

	if (cbBuckets[actionOrCbId]) {
		// 优化callbackid模式下的多余内存占用: 用完即删
		delete cbBuckets[actionOrCbId];
	}
}
