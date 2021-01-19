const ua = navigator.userAgent.toLowerCase();

export const isInIPhone = ~ua.indexOf("iphone");

export const isInFlutter = ~ua.indexOf("flutter");

export function canUseIOSWK() {
	if (!isInIPhone) return false;

	let version = ua.match(/os [\d._]+/gi)[0];

	version = (version + "").replace(/[^0-9|_.]/gi, "");

	return parseInt(version.split("_")[0], 10) > 7;
}
