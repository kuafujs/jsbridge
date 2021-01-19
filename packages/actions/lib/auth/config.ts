import { add, h5Invoke } from "@jsbridge/core";

export interface AuthParams {
	/**
	 * 是否开启调式模式
	 */
	debug: boolean;
	/**
	 * 应用ID
	 */
	appId: string;
	/**
	 * 时间戳
	 */
	timeStamp: string;
	/**
	 * 生成签名的随机串
	 */
	nonceStr: string;
	/**
	 * 后台接口返回的签名串
	 */
	signature: string;
	/**
	 * 允许访问的api操作
	 */
	jsApiList: "*" | string[];
	/**
	 * 扩展参数
	 */
	extra?: any;
}

declare module "@jsbridge/core" {
	interface CustomActions {
		/**
		 * JSBridge鉴权
		 *
		 * @param  params 授权信息
		 */
		config(params: AuthParams): void;
	}
}

const action = "config";

add(action, (params: AuthParams) => h5Invoke(action, params));
