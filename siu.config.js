const { defineConfig } = require("@siujs/cli");
const path = require("path");

module.exports = defineConfig({
	plugins: [
		[
			"@siujs/jssdk",
			{
				custom: {
					build: {
						transformConfig(config) {
							config.treeshake({
								moduleSideEffects: true
							});
							config.plugin("esbuild").tap(args => {
								args[0] = args[0] || {};
								args[0].importeeAlias = id => {
									const parts = id.split(/[/\\]/);
									id = parts.shift();
									if (id.startsWith("@jsbridge")) {
										return path.resolve(__dirname, "./packages/", parts.join("/"));
									}
									return id;
								};
								return args;
							});
						}
					}
				}
			}
		],
		[
			"@siujs/build-es",
			{
				excludePkgs: ["core", "app", "wx"],
				custom: {
					build: {
						sourceDir: "lib",
						destDir: "es"
					}
				}
			}
		]
	]
});
