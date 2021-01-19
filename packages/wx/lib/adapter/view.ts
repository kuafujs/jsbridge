import { ShareParams } from "@jsbridge/actions";
import { BridgeActions } from "@jsbridge/core";

export function fit(bridge: BridgeActions, action: string, data: ShareParams, callbackid?: string) {
	if (action === "view.close") {
		wx.closeWindow();
	} else if (action === "view.prepareShare") {
		data = data as ShareParams;
		if (data.scopes && data.scopes.length) {
			data.scopes.map(scope => {
				if (scope === "qq") {
					wx.updateAppMessageShareData({
						title: data.title, // 分享标题
						desc: data.desc, // 分享描述
						link: data.url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
						imgUrl: data.iconBase64 || data.iconUrl, // 分享图标
						success: function () {
							callbackid && bridge.invokeH5(callbackid);
						}
					});
				} else if (scope === "qZone" || scope === "wxMoment") {
					wx.updateTimelineShareData({
						title: data.title, // 分享标题
						link: data.url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
						imgUrl: data.iconBase64 || data.iconUrl, // 分享图标
						success: function () {
							callbackid && bridge.invokeH5(callbackid);
						}
					});
				}
			});
		}
	}
}
