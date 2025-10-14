import typescriptEslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";

export default [
	{
		files: ["**/*.ts"],
	},
	{
		plugins: {
			"@typescript-eslint": typescriptEslint,
		},
		languageOptions: {
			parser: tsParser,
			ecmaVersion: 2022,
			sourceType: "module",
		},
		rules: {
			"curly": "warn",
			"eqeqeq": "warn",
			"no-throw-literal": "warn",
			"no-cond-assign": "warn",
			"no-dupe-else-if": "warn",
			"no-dupe-keys": "warn",
			"no-unused-vars": "warn",
			"no-duplicate-case": "warn",
			"no-unassigned-vars": "warn",
			"no-console": ["error", { allow: ["error"] }],
			"no-else-return": "warn",

			"default-param-last": "off",

			"@typescript-eslint/no-empty-object-type": "error",
			"@typescript-eslint/no-duplicate-enum-values": "warn",
			"@typescript-eslint/explicit-function-return-type": "warn",
			"@typescript-eslint/array-type": ["warn", { default: "array" }],
			"@typescript-eslint/default-param-last": "warn",
			"@typescript-eslint/naming-convention": ["warn", { selector: "import", format: ["camelCase", "PascalCase"] }],
		},
	},
];
