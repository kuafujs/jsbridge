import "@jsbridge/actions";

import { actions, BridgeActions, PostMessageArgs } from "@jsbridge/core";

import { canUseIOSWK, isInFlutter } from "./utils";

declare global {
	interface Window {
		webkit?: any;
		AppJSBridge: BridgeActions;
		[x: string]: any;
	}
}

let JSBridgeGlobalName = "JSBridge";

const bridge = (window.AppJSBridge = actions);

/**
 *
 * 针对App内嵌至webview容器的JS全局对象名称进行别名设置
 *
 * @param name 别名
 */
bridge.__alias = (name: string) => {
	if (name === "AppJSBridge") {
		console.warn("`AppJSBridge` is in use!");
		return;
	}
	JSBridgeGlobalName = name;
	return bridge;
};

bridge.use((payload: PostMessageArgs) => {
	if (isInFlutter) {
		window[JSBridgeGlobalName]?.postMessage(JSON.stringify(payload));
		return;
	}
	if (canUseIOSWK()) {
		window.webkit?.messageHandlers?.[JSBridgeGlobalName]?.postMessage(payload);
		return;
	}
	window[JSBridgeGlobalName]?.invoke(payload.action, payload.data, payload.callbackid);
});
