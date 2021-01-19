import { add, h5Invoke } from "@jsbridge/core";

export type QRCodeScanType = "qrCode" | "barCode";

export type QRCodeScanCallback = (result: string) => void;

export interface QRCodeOption {
	/**
	 * 是否需要返回H5扫码结果
	 * 默认为0，扫描结果由App内部自行处理，1则直接返回扫描结果
	 */
	needResult: number;
	/**
	 * 扫一扫
	 */
	scanType: QRCodeScanType[];
}

declare module "@jsbridge/core" {
	interface DeviceActions {
		/**
		 * 调用App扫一扫
		 *
		 * @param opt
		 * @param cb
		 */
		scanQRCode(opt: QRCodeOption, cb: QRCodeScanCallback): void;
	}
}

const action = "device.scanQRCode";

add(action, (opt: QRCodeOption, cb: QRCodeScanCallback) => h5Invoke(action, opt, cb));
