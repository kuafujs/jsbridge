import { on } from "@jsbridge/core";

declare module "@jsbridge/core" {
	interface CustomActions {
		/**
		 * 监听宿主返回页面操作
		 *
		 * @param  params
		 */
		onViewBack(params: ListenerActionCallbackArgs<any>): void;
	}
}

on("view.back");
