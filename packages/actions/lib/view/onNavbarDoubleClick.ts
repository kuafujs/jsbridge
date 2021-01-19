import { on } from "@jsbridge/core";

declare module "@jsbridge/core" {
	interface CustomActions {
		/**
		 * 监听App双击Navbar处的事件回调
		 *
		 *   主要用于H5去控制是否自动返回顶部
		 *
		 * @param  params
		 */
		onViewNavbarDoubleClick(params: ListenerActionCallbackArgs<any>): void;
	}
}

on("view.navbar.doubleClick");
