import { add, h5Invoke, HandleFn } from "@jsbridge/core";

declare module "@jsbridge/core" {
	interface ImageActions {
		/**
		 *
		 * 保存图片至本地
		 *
		 * @param imgUrlOrBase64 图片地址或图片对应的base64字符串
		 * @param cb 回调操作
		 */
		save(imgUrlOrBase64: string, cb?: HandleFn): void;
	}
}

const action = "image.save";

add(action, (imgUrlOrBase64: string, cb?: HandleFn) => h5Invoke(action, { imgUrlOrBase64 }, cb));
