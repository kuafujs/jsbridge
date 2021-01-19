import { on } from "@jsbridge/core";

declare module "@jsbridge/core" {
	interface CustomActions {
		/**
		 * JSBridge授权通过后，App调用的回调监听
		 *
		 * @param fn
		 */
		onReady(args?: ListenerActionCallbackArgs<any>): void;
	}
}

on("ready");
