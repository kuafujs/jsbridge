import { add, h5Invoke } from "@jsbridge/core";

export type ImageSourceType = "album" | "camera";

export type ImageSizeType = "original" | "compressed";

export type ImageChooseCallback = (res: { urls: string[] }) => void;

export interface ImageChooseParams {
	/**
	 * 选择图片的数量,默认1，最大9
	 */
	count: number;
	/**
	 * 指定是原图还是压缩图，默认二者都有
	 */
	sizeType: ImageSizeType[];
	/**
	 * 指定来源是相册还是相机，默认二者都有
	 */
	sourceType: ImageSourceType[];
	/**
	 * 针对个性化业务的扩展使用
	 */
	extra?: any;
}

declare module "@jsbridge/core" {
	interface ImageActions {
		/**
		 * 拍照或从手机相册中选图
		 *
		 * @param opt 配置接口信息
		 * @param cb 选择完成后的回调操作
		 */
		choose(opt: ImageChooseParams, cb: ImageChooseCallback): void;
	}
}

const action = "image.choose";

add(action, (opt: ImageChooseParams, cb: ImageChooseCallback) => h5Invoke(action, opt, cb));
