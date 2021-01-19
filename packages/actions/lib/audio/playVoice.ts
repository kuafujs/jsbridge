import { add, h5Invoke, HandleFn } from "@jsbridge/core";

declare module "@jsbridge/core" {
	interface AudioActions {
		/**
		 * 播放语音接口
		 *
		 * @param voiceText 待播放的音频文本
		 * @param cb 回调函数[可选]
		 */
		playVoice(voiceText?: string, cb?: HandleFn): void;
	}
}

const action = "audio.playVoice";

add(action, (voiceText?: string, cb?: HandleFn) => h5Invoke(action, { text: voiceText || "" }, cb));
