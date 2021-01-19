import { add, h5Invoke } from "@jsbridge/core";

declare module "@jsbridge/core" {
	interface AudioActions {
		/**
		 * 开启音频录制
		 */
		startRecord(): void;
	}
}

const action = "audio.startRecord";

add(action, () => h5Invoke(action, {}));
