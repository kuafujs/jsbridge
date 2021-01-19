import { add, h5Invoke } from "@jsbridge/core";

declare module "@jsbridge/core" {
	interface ViewActions {
		/**
		 * 通知app跳转页面
		 *
		 * @param url 跳转页面的地址
		 * @param title 跳转页面的title
		 * @param query 跳转页面所需要传递的参数
		 */
		goto(url: string, title: string, query?: Record<string, any>): void;
	}
}

const action = "view.goto";

add(action, (url: string, title?: string, query?: Record<string, any>) => h5Invoke(action, { url, title, query }));
