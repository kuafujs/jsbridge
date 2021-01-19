import { LocationParam, QRCodeOption } from "@jsbridge/actions";
import { BridgeActions } from "@jsbridge/core";

export function fit(bridge: BridgeActions, action: string, data: LocationParam | QRCodeOption, callbackid?: string) {
	if (action === "device.getNetworkType") {
		wx.getNetworkType({
			success: (res: any) => {
				callbackid && bridge.invokeH5(callbackid, res);
			}
		});
	} else if (action === "device.getLocation") {
		data = data as LocationParam;
		wx.getLocation({
			type: data.type,
			success: (res: any) => {
				callbackid && bridge.invokeH5(callbackid, res);
			}
		});
	} else if (action === "device.scanQRCode") {
		data = data as QRCodeOption;
		wx.scanQRCode({
			needResult: data.needResult, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
			scanType: data.scanType, // 可以指定扫二维码还是一维码，默认二者都有
			success: (res: any) => {
				// 当needResult 为 1 时，扫码返回的结果
				callbackid && bridge.invokeH5(callbackid, res.resultStr);
			}
		});
	}
}
