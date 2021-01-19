import { actions, add, HandleFn } from "./actions";
import { h5Invoke, invokeH5 } from "./interaction";

add("invokeH5", invokeH5);

add("wrap", (action: string, handler?: HandleFn) => {
	/* istanbul ignore if */
	if (
		!(
			action === "on" ||
			action === "add" ||
			action === "h5Invoke" ||
			action === "invokeH5" ||
			action === "postMsg" ||
			action === "use"
		)
	) {
		add(
			action,
			handler ||
				((params: Record<string, any>, callback: HandleFn) => {
					h5Invoke(action, params, callback);
				})
		);
	}
	return actions;
});

export * from "./actions";

export * from "./interaction";

export * from "./utils";
