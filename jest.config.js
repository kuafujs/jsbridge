const path = require("path");
const fs = require("fs");

const rootDir = process.cwd().split("packages").shift();

const packagesDir = path.resolve(rootDir, "./packages");

const moduleNameMapper = fs
	.readdirSync(packagesDir)
	.map(dir => path.resolve(packagesDir, dir))
	.filter(f => fs.statSync(f).isDirectory() && fs.existsSync(path.resolve(f, "./package.json")))
	.reduce((prev, cur) => {
		const pkgName = path.basename(cur);
		const pkgjson = JSON.parse(fs.readFileSync(path.resolve(cur, "./package.json")).toString());
		prev[`^${pkgjson.name}`] = path.resolve(rootDir, `./packages/${pkgName}/lib/index.ts`);
		return prev;
	}, {});

const utMdus = (process.env.UT_MDUS || "*").split(",");

module.exports = {
	rootDir,
	moduleFileExtensions: ["ts", "js"],
	moduleNameMapper,
	transform: {
		"^.+\\.(ts|tsx)$": "ts-jest"
	},
	coverageDirectory: path.resolve(rootDir, "./coverage"),
	collectCoverage: true,
	testMatch: utMdus.map(mdu => `<rootDir>/packages/${mdu}/__tests__/*.(test|spec).(ts|js)`)
};
