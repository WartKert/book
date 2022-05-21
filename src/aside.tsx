import React from "react";
import imgMenu from "./image/menu.png";
import imgHome64 from "./image/home-64.png";
import imgTaskRun64 from "./image/task-runner-64.png";

import styles from "./aside.module.css";
import { IndexRouteProps, RouteProps, To, useNavigate, Navigate } from "react-router-dom";

import type { navType } from "./myTypeNavigate";
import { LinkNavigation, RoutesNavigation } from "./Navigation";
import { Style } from "util";

interface Props {
	objLink: {
		[key: string]: navType.arrLink;
	};
	objIcon: {
		[key: string]: navType.arrIcon;
	};
	exportStyle?(value: Style, func: Function): void;
	toCloseMenu?: boolean;
}

interface State {
	isHidden: boolean;
	toHome: boolean;
}

interface goLinkProps {
	item: [string, navType.arrIcon];
	dataset?: string;
}

function GoLink(props: goLinkProps) {
	const navigate = useNavigate();
	return (
		<React.Fragment>
			<button
				id={props.item[0]}
				hidden
				data-button={props.dataset}
				onClick={() => {
					navigate(`${props.item[1].to}`);
				}}
			></button>
		</React.Fragment>
	);
}

export class AsideLeft extends React.Component<Props, State> {
	isEventShowMenu: boolean = false;
	constructor(props: Props) {
		super(props);
		this.state = { isHidden: true, toHome: false };
		this.showMenu = this.showMenu.bind(this);
		this.toClose = this.toClose.bind(this);
	}

	showMenu(event?: any) {
		if (this.isEventShowMenu == false) {
			this.setState({ isHidden: false });
			window.addEventListener("click", this.toClose);
			this.isEventShowMenu = true;
		} else {
			this.setState({ isHidden: true });
			this.isEventShowMenu = false;
			window.removeEventListener("click", this.toClose);
		}
	}

	toClose(event: any) {
		if (this.isEventShowMenu && event.target.dataset.button != "iconMenu") {
			this.showMenu();
		}
	}

	render(): React.ReactNode {
		return (
			<React.Fragment>
				<label htmlFor='menu' onClick={this.showMenu} data-button='iconMenu'>
					<img src={imgMenu} alt='Меню' data-button='iconMenu' />
				</label>
				{/* <input id='menu' type='checkbox' onChange={this.showMenu}></input> */}
				<div className={this.state.isHidden ? styles.menu_isHidden + " " + styles.menu : styles.menu}>
					<nav className={styles.menu__block}>
						{Object.entries(this.props.objIcon).map((item) => {
							return (
								<div className={styles.menu__elem} key={item[0]}>
									<label htmlFor={item[0]} className={styles.menu__icon} data-button='iconMenu'>
										<img
											src={item[1].image}
											alt={"Image:" + item[1].text}
											data-button='iconMenu'
											className={styles.menu__image}
										/>
										<span data-button='iconMenu'>{item[1].text} </span>
									</label>
									<GoLink item={item} dataset='iconMenu' />
								</div>
							);
						})}
					</nav>
				</div>
			</React.Fragment>
		);
	}
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
