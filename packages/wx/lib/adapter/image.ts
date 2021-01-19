import { ImageChooseParams, ImagePreviewParams } from "@jsbridge/actions";
import { BridgeActions } from "@jsbridge/core";

export function fit(
	bridge: BridgeActions,
	action: string,
	data: ImageChooseParams | ImagePreviewParams | string,
	callbackid: string
) {
	if (action === "image.choose") {
		data = data as ImageChooseParams;
		wx.chooseImage({
			count: data.count, // 默认9
			sizeType: data.sizeType, // 可以指定是原图还是压缩图，默认二者都有
			sourceType: data.sourceType, // 可以指定来源是相册还是相机，默认二者都有
			success: function (res: { localIds: string[] }) {
				const localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
				callbackid && bridge.invokeH5(callbackid, { urls: localIds });
			}
		});
	} else if (action === "image.preview") {
		data = data as ImagePreviewParams;
		wx.previewImage({
			current: data.current, // 当前显示图片的http链接
			urls: data.urls // 需要预览的图片http链接列表
		});
	} else if (action === "image.save") {
		data = data as string;
		wx.uploadImage({
			localId: data, // 需要上传的图片的本地ID，由chooseImage接口获得
			isShowProgressTips: 1, // 默认为1，显示进度提示
			success: function (res: { serverId: string }) {
				const serverId = res.serverId; // 返回图片的服务器端ID
				callbackid && bridge.invokeH5(callbackid, serverId);
			}
		});
	}
}
