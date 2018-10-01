import HtmlWebpackPlugin from "html-webpack-plugin";

import config from "./src/config.json";

import path from "path";

const { NODE_ENV } = process.env;
const isProd = NODE_ENV === "production";

const htmlPluginOptions = {
	template: "!!ejs-loader!" + path.resolve(__dirname, "src/index.html"),
	inject: false,
	minify: isProd
		? {
				collapseWhitespace: true,
				removeComments: true
		  }
		: {},
	favicon: isProd
		? path.resolve(__dirname, "src/assets/favicon.ico")
		: path.resolve(__dirname, "src/assets/debug/favicon.ico"),
	config
};

module.exports = {
	mode: NODE_ENV,

	entry: "./src/index.js",
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "bundle.js"
	},
	plugins: [
		new HtmlWebpackPlugin(htmlPluginOptions)
	]
};
