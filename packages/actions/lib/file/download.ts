import { add, h5Invoke } from "@jsbridge/core";

export interface FileDownloadedInfo {
	/**
	 * 待下载的文件名称
	 */
	name: string;
	/**
	 * 待下载的文件大小，单位:KB
	 */
	size?: number;
	/**
	 * 待下载文件的后缀
	 */
	ext?: string;
	/**
	 * 专门用来做项目自定义扩展使用
	 */
	extra?: any;
	/**
	 * 当前下载的进度
	 */
	progress?: number;
}

export type FileDownloadCallback = (downloadedFile: FileDownloadedInfo) => void;

export interface FileDownloadParams extends FileDownloadedInfo {
	/**
	 * 文件url地址
	 */
	url: string;
}

declare module "@jsbridge/core" {
	interface FileActions {
		/**
		 * 文件下载
		 *
		 * @param fileInfo 待下载的文件信息
		 * @param cb 文件下载完成的回调
		 */
		download(fileInfo: FileDownloadParams, cb?: FileDownloadCallback): void;
	}
}

const action = "file.download";

add(action, (fileInfo: FileDownloadedInfo, cb?: FileDownloadCallback) => h5Invoke(action, fileInfo, cb));
