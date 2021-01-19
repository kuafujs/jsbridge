import { add, h5Invoke } from "@jsbridge/core";

declare module "@jsbridge/core" {
	interface ViewActions {
		/**
		 * 通知页面向前进
		 */
		forward(): void;
	}
}

const action = "view.forward";

add(action, () => h5Invoke(action));
