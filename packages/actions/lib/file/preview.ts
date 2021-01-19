import { add, h5Invoke } from "@jsbridge/core";

export interface FilePreviewParams {
	/**
	 * 文件路径
	 */
	path: string;
	/**
	 * 文件名称
	 */
	name: string;
	/**
	 * 文件后缀
	 */
	ext?: string;
	/**
	 * 文件大小,单位:KB
	 */
	size?: number;
	/**
	 * 针对个性化业务的扩展使用
	 */
	extra?: any;
}

/**
 * @params {number|string} progress 阅读进度
 */
export type FilePreviewCallback = (progress?: number | string) => void;

declare module "@jsbridge/core" {
	interface FileActions {
		/**
		 * 预览文件
		 *
		 * @param fileInfo 待预览的文件信息
		 * @param cb 预览成功并且阅读后的回调
		 */
		preview(fileInfo: FilePreviewParams, cb?: FilePreviewCallback): void;
	}
}

const action = "file.preview";

add(action, (fileInfo: FilePreviewParams, cb?: FilePreviewCallback) => {
	if (!fileInfo.ext && ~fileInfo.name.indexOf(".")) {
		fileInfo.ext = fileInfo.name.split(".").pop();
	}
	h5Invoke(action, fileInfo, cb);
});
