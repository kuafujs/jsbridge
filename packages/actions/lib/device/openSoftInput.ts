import { add, h5Invoke, noop } from "@jsbridge/core";

declare module "@jsbridge/core" {
	interface DeviceActions {
		/**
		 * 呼叫宿主唤起软键盘
		 *
		 * @param cb 唤起后的回调
		 */
		openSoftInput(cb?: () => void): void;
	}
}

const action = "device.openSoftInput";

add(action, (cb?: () => void) => h5Invoke(action, noop, cb));
