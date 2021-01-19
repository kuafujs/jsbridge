import { on } from "@jsbridge/core";

export type ShareScopeItem =
	| "wx"
	| "wxMoment"
	| "dingtalk"
	| "qq"
	| "qZone"
	| "weibo"
	| "selfChat"
	| "selfMoment"
	| "copyLink";

export interface SharedResult {
	/**
	 * 分享是否成功
	 */
	status: boolean;
	/**
	 * 分享的目标位置
	 */
	scope: ShareScopeItem;
	/**
	 * 接收到此分享信息的接口者标识
	 */
	reciever?: string;
}

declare module "@jsbridge/core" {
	interface CustomActions {
		/**
		 * 宿主执行页面分享之后的回调
		 *
		 * @param params
		 */
		onViewShared(params: ListenerActionCallbackArgs<SharedResult>): void;
	}
}

on("view.shared");
