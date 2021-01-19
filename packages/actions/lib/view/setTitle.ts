import { add, h5Invoke, HandleFn } from "@jsbridge/core";

declare module "@jsbridge/core" {
	interface ViewActions {
		/**
		 * 改变当前导航栏的标题
		 *
		 * @param title 新的标题
		 * @param cb 设置成功后的回调
		 */
		changeTitle(title: string, cb?: HandleFn): void;
	}
}

const action = "view.setTitle";

add(action, (title: string, cb?: HandleFn) => h5Invoke(action, { title }, cb));
