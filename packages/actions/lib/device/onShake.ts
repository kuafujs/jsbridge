import { on } from "@jsbridge/core";

declare module "@jsbridge/core" {
	interface CustomActions {
		/**
		 * 监听手机摇一摇
		 *
		 * @param  params
		 */
		onDeviceShake(params: ListenerActionCallbackArgs<any>): void;
	}
}

on("device.shake");
