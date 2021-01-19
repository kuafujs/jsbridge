import { add, h5Invoke, noop } from "@jsbridge/core";

import { NetworkType } from "./getNetworkType";

export interface PhoneInfoParams {
	/**
	 * 手机屏幕宽度
	 */
	screenWidth: number;
	/**
	 * 手机屏幕高度
	 */
	screenHeight: number;
	/**
	 * 手机品牌
	 */
	brand: string;
	/**
	 * 手机型号
	 */
	model: string;
	/**
	 * 版本
	 */
	version: string;
	/**
	 * 网络状况
	 */
	netInfo: NetworkType;
	/**
	 * 运营商信息
	 */
	operatorType: string;
}

export type PhoneInfoCallback = (params: PhoneInfoParams) => void;

declare module "@jsbridge/core" {
	interface DeviceActions {
		/**
		 * 获取手机基础信息
		 *
		 * @param cb
		 */
		getPhoneInfo(cb: PhoneInfoCallback): void;
	}
}

const action = "device.getPhoneInfo";

add(action, (cb: PhoneInfoCallback) => h5Invoke(action, noop, cb));
