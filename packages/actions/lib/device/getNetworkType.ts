import { add, h5Invoke, noop } from "@jsbridge/core";

export type NetworkType = "2g" | "3g" | "4g" | "5g" | "wifi" | "NOTREACHABLE" | "UNKNOWN";

export type NetworkTypeCallback = (networkInfo: { type: NetworkType; [x: string]: any }) => void;

declare module "@jsbridge/core" {
	interface DeviceActions {
		/**
		 * 获取网络状态接口
		 *
		 * @param cb 回调函数
		 */
		getNetworkType(cb: NetworkTypeCallback): void;
	}
}

const action = "device.getNetworkType";

add(action, (cb: NetworkTypeCallback) => h5Invoke(action, noop, cb));
