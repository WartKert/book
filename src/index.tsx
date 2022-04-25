import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Header from "./header";
import Main from "./main";

export let test: string = "zzzzz";

const rootHeader = ReactDOM.createRoot(document.getElementById("header") as HTMLElement);
const rootMain = ReactDOM.createRoot(document.getElementById("main") as HTMLElement);
const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
interface anyProps {
	textWelcom: string;
}
rootHeader.render(
	<div>
		<Header className='sd' textWelcom='Оглавление' />
	</div>
);
rootMain.render(
	<div>
		<Main text='' />
	</div>
);
