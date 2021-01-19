const camelizeRE = /\.(\w)/g;

/**
 *
 * '.a' to 'A'
 * 'a.b' to `aB`
 *
 * @param str input string
 * @param isFirstUpper make first char tobe Upper
 */
export function camelize(str: string, isFirstUpper?: boolean): string {
	str = str.replace(camelizeRE, (_, c) => c.toUpperCase());

	str = isFirstUpper ? str[0].toUpperCase() + str.substring(1) : str;

	return str;
}

/* istanbul ignore next */
// eslint-disable-next-line @typescript-eslint/no-empty-function
export const noop = () => {};

/**
 * 柯里化的对象类型判断
 *
 * @export
 * @param {string} type 指定的对象类型
 * @returns {Function}
 */
/* istanbul ignore next */
export function isType(type: string): (obj: any) => boolean {
	return (obj: any): boolean => Object.prototype.toString.call(obj) === "[object " + type + "]";
}

/**
 *  是否是Function类型
 */
/* istanbul ignore next */
export const isFunction = isType("Function");

/**
 * 是否是String类型
 */
/* istanbul ignore next */
export const isString = isType("String");
