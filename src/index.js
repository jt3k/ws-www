import React from "react";
import { render } from "react-dom";

let root = document.getElementById("app");
function init() {
	let App = require("./App.js").default;
	render(<App />, root);
}

if (module.hot) {
	module.hot.accept("./App.js", init);
}

init();
