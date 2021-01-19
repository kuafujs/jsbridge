import { add, h5Invoke, isString } from "@jsbridge/core";

export interface VideoParams {
	/**
	 * video链接
	 */
	url: string;
	/**
	 * 播放倍速
	 */
	speed?: number;
	/**
	 * 直接定位的
	 */
	progress?: number;
	/**
	 * 播放尺寸比例
	 *
	 *  例如: 16*9
	 */
	size?: string;
	/**
	 * 扩展参数
	 */
	extra?: any;
}

export interface VideoPlayFeedback {
	/**
	 * 视频播放状态
	 *
	 * 0: 已暂停 ，1: 播放中
	 */
	state: 0 | 1;
	/**
	 * 播放进度
	 *
	 * @type {number}
	 */
	progress?: number;
}

declare module "@jsbridge/core" {
	interface VideoActions {
		/**
		 * 通知App利用原生视频播放H5的视频
		 *
		 * @param url 视频链接地址
		 * @param cb 视频播放后的回调
		 */
		play(url: string | VideoParams, cb?: (feedback: VideoPlayFeedback) => void): void;
	}
}

const action = "video.play";

add(action, (url: string | VideoParams, cb?: (feedback: VideoPlayFeedback) => void) =>
	h5Invoke(action, (isString(url) ? { url } : url) as VideoParams, cb)
);
