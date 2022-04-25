import { type } from "@testing-library/user-event/dist/type";
import React from "react";
import { ReactDOM } from "react";
import { JsxAttributeLike } from "typescript";
import { test } from "./index";
interface Props {
	className: string;
	textWelcom: string;
}
class Header extends React.Component<Props> {
	private textData: string;

	constructor(props: Props) {
		super(props);
		this.textData = props.textWelcom;
	}

	set text(newText: string) {
		this.textData = newText;
	}

	render(): JSX.Element {
		// this.data = test;
		return (
			<div>
				<h1>{this.textData}</h1>
			</div>
		);
	}
}

export default Header;
