import { add, h5Invoke } from "@jsbridge/core";

import { SharedResult, ShareScopeItem } from "./onShared";

export interface ShareObject {
	/**
	 * 分享标题
	 */
	title: string;
	/**
	 * 分享链接的描述
	 */
	desc?: string;
	/**
	 * 待分享的链接地址
	 */
	url: string;
	/**
	 * 分享的图标链接地址
	 */
	iconUrl?: string;
	/**
	 * 分享的图标对应的base64字符串
	 */
	iconBase64?: string;
	/**
	 * 专门用于启动微信授权回调的分享地址
	 */
	wxUrl?: string;
	/**
	 * 针对个性化业务的扩展使用
	 */
	extra?: any;
}

export interface ShareParams extends ShareObject {
	/**
	 * 可分享的范围
	 */
	scopes: ShareScopeItem[];
}

declare module "@jsbridge/core" {
	interface ViewActions {
		/**
		 * 通知App分享
		 *
		 * @param opt 分享的参数设置
		 * @param cb
		 */
		share(opt: ShareParams, cb?: (res: SharedResult) => void): void;
	}
}

const action = "view.share";

add(action, (opt: ShareParams, cb?: (res: SharedResult) => void) => h5Invoke(action, opt, cb));
