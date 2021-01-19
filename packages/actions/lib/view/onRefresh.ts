import { on } from "@jsbridge/core";

declare module "@jsbridge/core" {
	interface CustomActions {
		/**
		 * 监听App通知H5的页面刷新事件
		 *
		 * @param  params
		 */
		onViewRefresh(params: ListenerActionCallbackArgs<any>): void;
	}
}

on("view.refresh");
