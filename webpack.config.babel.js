import HtmlWebpackPlugin from "html-webpack-plugin";

import config from "./src/config.json";
import ssr from "./src/ssr.js";
import path from "path";

const { NODE_ENV } = process.env;
const isProd = NODE_ENV === "production";

const htmlPluginOptions = {
	template: path.resolve(__dirname, "src/index.html"),
	minify: isProd
		? {
				collapseWhitespace: true,
				removeComments: true
		  }
		: {},
	favicon: isProd
		? path.resolve(__dirname, "src/assets/favicon.ico")
		: path.resolve(__dirname, "src/assets/debug/favicon.ico"),
	title: isProd ? config.title : `DEBUG — ${config.title}`,
	config,
	render: ssr
};

export default {
	mode: NODE_ENV,

	entry: "./src/index.js",
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "bundle.js"
	},
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader"
				}
			}
		]
	},
	plugins: [new HtmlWebpackPlugin(htmlPluginOptions)]
};
