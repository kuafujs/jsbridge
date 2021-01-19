import { add, h5Invoke } from "@jsbridge/core";

declare module "@jsbridge/core" {
	interface ViewActions {
		/**
		 * 关闭当前页面
		 *
		 */
		close(): void;
	}
}

const action = "view.close";

add(action, () => h5Invoke(action));
