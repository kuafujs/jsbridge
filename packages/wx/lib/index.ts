import "@jsbridge/actions/lib/auth/config";
import "@jsbridge/actions/lib/auth/ready";
import "@jsbridge/actions/lib/device/getNetworkType";
import "@jsbridge/actions/lib/device/getLocation";
import "@jsbridge/actions/lib/device/scanQRCode";
import "@jsbridge/actions/lib/image/choose";
import "@jsbridge/actions/lib/image/preview";
import "@jsbridge/actions/lib/image/save";
import "@jsbridge/actions/lib/view/close";
import "@jsbridge/actions/lib/view/prepareShare";

import { actions, BridgeActions, PostMessageArgs } from "@jsbridge/core";

import { fit as AuthFit } from "./adapter/auth";
import { fit as DeviceFit } from "./adapter/device";
import { fit as ImageFit } from "./adapter/image";
import { fit as ViewFit } from "./adapter/view";

declare global {
	interface Window {
		wx: any;
		AppJSBridge: BridgeActions;
	}

	const wx: any;
}

const bridge = (window.AppJSBridge = actions);

bridge.use((payload: PostMessageArgs) => {
	const data = payload.data ? JSON.parse(payload.data) : null;

	AuthFit(bridge, payload.action, data);
	DeviceFit(bridge, payload.action, data, payload.callbackid);
	ImageFit(bridge, payload.action, data, payload.callbackid);
	ViewFit(bridge, payload.action, data, payload.callbackid);
});

wx.ready(() => {
	bridge.invokeH5("ready");
});

wx.error((res: any) => {
	bridge.debug && bridge.debug("unknown", { err: res });
});
