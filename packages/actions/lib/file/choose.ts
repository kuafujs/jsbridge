import { add, h5Invoke } from "@jsbridge/core";

export interface FileInfo {
	/**
	 * 文件名称
	 */
	name: string;
	/**
	 * 文件大小,单位:KB
	 */
	size: number;
	/**
	 * 文件路径
	 */
	filePath: string;
	/**
	 * 文件类别标签
	 */
	tag?: string;
	/**
	 * 针对个性化业务的扩展使用
	 */
	extra?: any;
}

export type FileChooseCallback = (args: { files: FileInfo[] }) => void;

export type FileType = "ppt" | "pptx" | "doc" | "docx" | "xls" | "xlsx" | "xlsm" | "txt" | "pdf" | "zip" | "7z" | "rar";

export interface FileChooseParams {
	/**
	 * 选择文件的数量,默认1
	 */
	count: number;
	/**
	 * 允许选择的文件类型,默认"*"
	 */
	allowTypes: string | FileType[];
	/**
	 * 是否需要自动上传, 默认true
	 */
	shouldUpload: boolean;
	/**
	 * 针对个性化业务的扩展使用
	 */
	extra?: any;
}

declare module "@jsbridge/core" {
	interface FileActions {
		/**
		 * 文件选择
		 *
		 * @param opt 选择的文件设置信息
		 * @param cb 选择成功后的回调
		 */
		choose(opt: FileChooseParams, cb: FileChooseCallback): void;
	}
}

const action = "file.choose";

add(action, (opt: FileChooseParams, cb: FileChooseCallback) =>
	h5Invoke(action, { allowTypes: "*", count: 1, shouldUpload: true, ...opt }, cb)
);
