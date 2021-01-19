import { on } from "@jsbridge/core";

declare module "@jsbridge/core" {
	interface CustomActions {
		/**
		 * 隐藏当前页面时，H5的监听
		 *
		 * @param  params
		 */
		onViewHide(params: ListenerActionCallbackArgs<any>): void;
	}
}

on("view.hide");
