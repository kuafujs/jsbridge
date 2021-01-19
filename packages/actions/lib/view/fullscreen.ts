import { add, h5Invoke, HandleFn } from "@jsbridge/core";

declare module "@jsbridge/core" {
	interface ViewActions {
		/**
		 * 全屏的设置
		 *
		 * @param flag 设置的标记位
		 * @param cb 回调
		 */
		fullscreen(flag: ViewFullscreenFlag, cb?: HandleFn): void;
	}
}

/**
 * 全屏标记
 *
 *  0 : 非全屏带导航栏
 *
 *  1 : 全屏不带状态栏
 *
 *  2 : 全屏带状态栏
 */
export type ViewFullscreenFlag = 0 | 1 | 2;

const action = "view.fullscreen";

add(action, (flag: ViewFullscreenFlag, cb?: HandleFn) => h5Invoke(action, { flag }, cb));
