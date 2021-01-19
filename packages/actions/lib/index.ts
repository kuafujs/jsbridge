/* eslint-disable @typescript-eslint/no-empty-interface */
declare module "@jsbridge/core" {
	interface AudioActions {}
	interface DeviceActions {}
	interface FileActions {}
	interface ImageActions {}
	interface VideoActions {}
	interface ViewActions {}

	interface CustomActions {
		audio: AudioActions;
		device: DeviceActions;
		file: FileActions;
		image: ImageActions;
		video: VideoActions;
		view: ViewActions;
	}
}

export * from "./audio/playVoice";
export * from "./audio/startRecord";
export * from "./audio/onRecordEnd";

export * from "./auth/config";
export * from "./auth/ready";

export * from "./device/getLocation";
export * from "./device/getNetworkType";
export * from "./device/getPhoneInfo";
export * from "./device/getUUID";
export * from "./device/scanQRCode";
export * from "./device/openSoftInput";
export * from "./device/onShake";

export * from "./file/choose";
export * from "./file/preview";
export * from "./file/download";

export * from "./image/choose";
export * from "./image/preview";
export * from "./image/save";

export * from "./video/play";

export * from "./view/back";
export * from "./view/close";
export * from "./view/forward";
export * from "./view/fullscreen";
export * from "./view/goto";
export * from "./view/setNavbarButton";
export * from "./view/setTitle";

export * from "./view/prepareShare";
export * from "./view/share";
export * from "./view/onShared";

export * from "./view/onBack";
export * from "./view/onShow";
export * from "./view/onHide";
export * from "./view/onRefresh";
export * from "./view/onNavbarDoubleClick";
