import { h5Invoke, invokeH5, isFunction } from "../lib";
import { actions, getListener, PostMessageArgs } from "../lib/actions";

test(" `add` ", () => {
	let actionTriggerText = "";
	actions.wrap("view.close", () => {
		actionTriggerText = "view.close";
	});
	actions.view.close();
	expect(actionTriggerText).toBe("view.close");

	actions.wrap("test", () => {
		actionTriggerText = "test";
	});
	actions.test();
	expect(actionTriggerText).toBe("test");
});

test(" actions property can't be delete ", () => {
	actions.wrap("view.back", () => {});

	expect(actions).toHaveProperty("view");
	expect(actions.view).toHaveProperty("close");

	try {
		delete actions.view;
	} catch {}
	expect(actions).toHaveProperty("view");

	try {
		delete actions.view.close;
	} catch {}
	expect(actions.view).toHaveProperty("close");
});

test(" h5=>host", done => {
	const link = "www.baidu.com";

	actions.wrap("view.goto", (url: string) => {
		h5Invoke("view.goto", { url });
	});

	actions.use((message: PostMessageArgs) => {
		expect(message.action).toBe("view.goto");
		expect(message.data).toBe(JSON.stringify({ url: link }));
		done();
	});

	actions.view.goto(link);
});
test(" h5=>host with callback ", done => {
	const link = "www.baidu.com";

	actions.wrap("view.goto", (url: string, cb?: () => void) => {
		h5Invoke("view.goto", { url }, cb);
	});

	actions.use((message: PostMessageArgs) => {
		expect(message.action).toBe("view.goto");
		expect(message.data).toBe(JSON.stringify({ url: link }));
		invokeH5(message.callbackid, "test");
	});

	actions.view.goto(link, (data: string) => {
		expect(data).toBe("test");
		done();
	});
});

test(" host=>h5 ", done => {
	actions.on("test");

	expect(actions).toHaveProperty("onTest");

	actions.onTest({
		success() {
			done();
		}
	});

	const handler = getListener("test");

	expect(!!handler).toBe(true);
	expect(isFunction(handler)).toBe(true);

	invokeH5("test");
});

test(" host=>h5 with payload", done => {
	actions.on("test");

	expect(actions).toHaveProperty("onTest");

	actions.onTest({
		success(data: any) {
			expect(data).toBe("message");
			done();
		}
	});

	const handler = getListener("test");

	expect(!!handler).toBe(true);
	expect(isFunction(handler)).toBe(true);

	invokeH5("test", "message");
});

test(" host=>h5 with error", done => {
	actions.on("test");

	expect(actions).toHaveProperty("onTest");

	actions.onTest({
		error(ex: any) {
			expect(ex).toBe("Error");
			done();
		}
	});

	const handler = getListener("test");

	expect(!!handler).toBe(true);
	expect(isFunction(handler)).toBe(true);

	invokeH5("test", "", "Error");
});

test(" host=>h5 with success handle error", done => {
	actions.on("test");

	expect(actions).toHaveProperty("onTest");

	actions.onTest({
		success() {
			throw new Error("Success Handle Error");
		},
		error(ex: any) {
			expect(ex).toBe("Success Handle Error");
			done();
		}
	});

	const handler = getListener("test");

	expect(!!handler).toBe(true);
	expect(isFunction(handler)).toBe(true);

	invokeH5("test", "");
});
