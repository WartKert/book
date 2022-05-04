import React from "react";
import imgMenu from "./image/menu.png";

import styles from "./aside.module.css";
import { IndexRouteProps, RouteProps, To, useNavigate } from "react-router-dom";
import { HomePage } from "./home";
import type { navType } from "./myTypeNavigate";
import { LinkNavigation, RoutesNavigation } from "./Navigation";

interface Props {
	objLink: {
		[key: string]: navType.arrLink;
	};
}

interface State {
	isHidden: boolean;
}

// export function ShowMenu(event: any) {
// 	console.log("event");
// 	if (event.target.checked == true) {
// 		console.log("constr1");
// 		<Menu isHidden={true} />;
// 	} else {
// 		console.log("constr0");
// 		<Menu isHidden={true} />;
// 	}
// }

// export function Aside(blockJSX: JSX.Element) {
// 	return blockJSX;
// }

export class AsideLeft extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = { isHidden: true };
		this.showMenu = this.showMenu.bind(this);
	}

	showMenu(event: any) {
		event.target.checked ? this.setState({ isHidden: false }) : this.setState({ isHidden: true });
	}

	render(): React.ReactNode {
		return (
			<React.Fragment>
				<label htmlFor='menu'>
					<img src={imgMenu} alt='Меню' />
				</label>
				<input id='menu' type='checkbox' hidden onChange={this.showMenu}></input>
				<div className={this.state.isHidden ? styles.menu_isHidden + " " + styles.menu : styles.menu}>
					<LinkNavigation objLink={this.props.objLink} />
				</div>
			</React.Fragment>
		);
	}
}

export function RefButton() {
	const navigate = useNavigate();
	return (
		<div className={styles.menu}>
			<button
				onClick={(event) => {
					navigate("/menu");
				}}
			>
				Home
			</button>
		</div>
	);
}

// export class Menu extends React.Component<Props, State> {
// 	constructor(props: Props) {
// 		super(props);
// 		this.state = { isHidden: true };
// 		this.showMenu = this.showMenu.bind(this);
// 		// Aside(props.elem);
// 		console.log("constr");
// 	}

// 	showMenu() {
// 		this.setState({ isHidden: false });
// 	}
// 	Aside(blockJSX: JSX.Element) {
// 		return blockJSX;
// 	}

// 	render(): React.ReactNode {
// 		console.log("render");
// 		return (
// 			<div>
// 				{this.props.elem != undefined && this.props.elem}
// 				<div className={this.state.isHidden ? styles.menu_isHidden + " " + styles.menu : styles.menu}>
// 					<p>xxxxxxxxxxxxx</p>
// 				</div>
// 			</div>
// 		);
// 	}
// }
