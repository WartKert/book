import { type } from "@testing-library/user-event/dist/type";
import React from "react";
import { ReactDOM } from "react";
import { JsxAttributeLike } from "typescript";
import { test } from "./index";
import styles from "./header.module.css";
import logo from "./image/logo_672.png";

interface Props {
	textWelcom: string;
}
class Header extends React.Component<Props> {
	private textData: string;
	private imgData: JSX.Element = (
		<a href='index.html' className={styles.header__link}>
			<img className={styles.header__imageLogo} src={logo} title='Перейти на главную страницу' alt='Изображение логотипа' />
		</a>
	);

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
			<div className={styles.header}>
				{this.imgData}
				<h1 className={styles.header__text}>{this.textData}</h1>
			</div>
		);
	}
}

export default Header;
