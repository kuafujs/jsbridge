import { AuthParams } from "@jsbridge/actions";
import { BridgeActions } from "@jsbridge/core";

export const wxJSApiList = [
	"updateAppMessageShareData",
	"updateTimelineShareData",
	"onMenuShareWeibo",
	"onMenuShareQZone",
	"startRecord",
	"stopRecord",
	"onVoiceRecordEnd",
	"playVoice",
	"pauseVoice",
	"stopVoice",
	"onVoicePlayEnd",
	"uploadVoice",
	"downloadVoice",
	"chooseImage",
	"previewImage",
	"uploadImage",
	"downloadImage",
	"translateVoice",
	"getNetworkType",
	"openLocation",
	"getLocation",
	"hideOptionMenu",
	"showOptionMenu",
	"hideMenuItems",
	"showMenuItems",
	"hideAllNonBaseMenuItem",
	"showAllNonBaseMenuItem",
	"closeWindow",
	"scanQRCode",
	"chooseWXPay",
	"openProductSpecificView",
	"addCard",
	"chooseCard",
	"openCard"
];

export function fit(bridge: BridgeActions, action: string, data: AuthParams) {
	if (action === "config" && data) {
		const wxConfigParams = {
			debug: data.debug,
			appId: data.appId,
			timestamp: data.timeStamp,
			nonceStr: data.nonceStr,
			signature: data.signature,
			jsApiList: data.jsApiList === "*" ? wxJSApiList : data.jsApiList
		};
		wx.config(wxConfigParams);
	}
}
