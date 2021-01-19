import { add, h5Invoke } from "@jsbridge/core";

import { ShareParams } from "./share";

declare module "@jsbridge/core" {
	interface ViewActions {
		/**
		 * 通知宿主提前准备好当前页面对应的分享参数
		 *
		 * @param opt 待分享参数
		 */
		prepareShare(opt: ShareParams, cb?: () => void): void;
	}
}

const action = "view.prepareShare";

add(action, (opt: ShareParams, cb: () => void) => h5Invoke(action, opt, cb));
