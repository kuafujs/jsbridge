import { add, h5Invoke } from "@jsbridge/core";

declare module "@jsbridge/core" {
	interface ViewActions {
		/**
		 * 页面回退
		 */
		back(): void;
	}
}

const action = "view.back";

add(action, () => h5Invoke(action));
