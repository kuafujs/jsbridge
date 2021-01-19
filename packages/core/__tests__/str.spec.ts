import { camelize } from "../lib/utils";

test("str:camelize", () => {
	expect(camelize(".a")).toBe("A");
	expect(camelize(".aB")).toBe("AB");
	expect(camelize("A.B")).toBe("AB");
	expect(camelize("a.b")).toBe("aB");
	expect(camelize(".a.b")).toBe("AB");
	expect(camelize("a..b")).toBe("a.B");
	expect(camelize("a.b", true)).toBe("AB");

	expect(camelize("on.shared")).toBe("onShared");
	expect(camelize("on.device.shake")).toBe("onDeviceShake");
});
