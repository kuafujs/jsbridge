import { on } from "@jsbridge/core";

declare module "@jsbridge/core" {
	interface CustomActions {
		/**
		 * 监听App通知H5音频录制的结束事件
		 *
		 * @param  params
		 */
		onAudioRecordEnd(params: ListenerActionCallbackArgs<any>): void;
	}
}

on("audio.record.end");
