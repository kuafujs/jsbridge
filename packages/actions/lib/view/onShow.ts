import { on } from "@jsbridge/core";

declare module "@jsbridge/core" {
	interface CustomActions {
		/**
		 * 显示当前页面时，H5的监听
		 *
		 * @param  params
		 */
		onViewShow(params: ListenerActionCallbackArgs<any>): void;
	}
}

on("view.show");
