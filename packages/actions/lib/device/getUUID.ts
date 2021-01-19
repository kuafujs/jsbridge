import { add, h5Invoke, noop } from "@jsbridge/core";

declare module "@jsbridge/core" {
	interface DeviceActions {
		/**
		 * 获取设备UUID
		 *
		 * @param cb
		 */
		getUUID(cb: (uuid: string) => void): void;
	}
}

const action = "device.getUUID";

add(action, (cb: (uuid: string) => void) => h5Invoke(action, noop, cb));
