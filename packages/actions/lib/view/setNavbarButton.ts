import { add, h5Invoke, HandleFn } from "@jsbridge/core";

export type ViewNavbarButtonPosition = "left" | "right";

export interface ViewNavbarButtonConfig {
	/**
	 * 待设置按钮的位置
	 */
	position: ViewNavbarButtonPosition;
	/**
	 * 设置按钮的索引
	 */
	index: number;
	/**
	 * 按钮对应的图标链接
	 */
	iconUrl?: string;
	/**
	 * 按钮对应的图标文件的base64串
	 */
	iconBase64Str?: string;
	/**
	 * 按钮对应的文本
	 */
	text?: string;
	/**
	 * 按钮对应的操作命令
	 */
	cmd?: string;
	/**
	 * 扩展参数
	 */
	extra?: any;
}

declare module "@jsbridge/core" {
	interface ViewActions {
		/**
		 * 设置App导航栏
		 *
		 * @param {ViewNavbarButtonConfig} opt 配置参数
		 * @param cb 配置后的回调
		 */
		setNavbarButton(opt: ViewNavbarButtonConfig, cb?: HandleFn): void;
	}
}

const action = "view.setNavbarButton";

add(action, (opt: ViewNavbarButtonConfig, cb?: HandleFn) => h5Invoke(action, opt, cb));
