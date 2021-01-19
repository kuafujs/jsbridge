import { add, h5Invoke } from "@jsbridge/core";

export interface ImagePreviewParams {
	/**
	 * 当前展示的图片地址
	 */
	current: string;
	/**
	 * 当前图片对应的索引
	 */
	currentIndex: number;
	/**
	 * 需要预览的图片链接列表
	 */
	urls: string[];
	/**
	 * 图标预览的标题
	 */
	titles?: string[];
	/**
	 * 针对个性化业务的扩展使用
	 */
	extra?: any;
}
declare module "@jsbridge/core" {
	interface ImageActions {
		/**
		 * 通知App去实现图片预览功能
		 *
		 * @param opt 预览参数配置信息
		 */
		preview(opt: ImagePreviewParams): void;
	}
}

const action = "image.preview";

add(action, (opt: ImagePreviewParams) => h5Invoke(action, opt));
