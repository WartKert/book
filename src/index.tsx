import React, { ReactComponentElement, ReactNode } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Header from "./header";
import Main from "./main";
import styles from "./index.module.css";
import { HashRouter, Route, Router, Routes, Link, NavigationType, To } from "react-router-dom";
import { HomePage } from "./home";
import { AsideLeft, RefButton } from "./aside";

import { isPropertySignature } from "typescript";
import { RouteProps, IndexRouteProps, NavigateFunction, LinkProps } from "react-router-dom";
import path from "path";
import type { navType } from "./myTypeNavigate";
import { LinkNavigation, RoutesNavigation } from "./Navigation";

export let test: string = "zzzzz";

const rootHeader = ReactDOM.createRoot(document.getElementById("header") as HTMLElement);
const rootMain = ReactDOM.createRoot(document.getElementById("main") as HTMLElement);
const root = ReactDOM.createRoot(document.getElementById("body") as HTMLElement);

interface Props {
	objRoutes: {
		[key: string]: navType.arrRoute;
	};
	objLink: {
		[key: string]: navType.arrLink;
	};
}

let myRoutes: Props = {
	objRoutes: {
		index: { path: "/", element: <HomePage /> },
		task1: { path: "/task", element: <HomePage /> },
		mmenu: { path: "/menu", element: <RefButton /> },
	},
	objLink: {
		index: { to: "/", text: "Главная страница" },
		task1: { to: "/task", text: "Задачи" },
	},
};

interface State {
	link: LinkProps["to"];
	elem?: IndexRouteProps["element"];
}

class Index extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
	}

	render(): React.ReactNode {
		return (
			<div className={styles.body}>
				<header id='header' className={styles.body__header}>
					<Header textWelcom='Оглавление' />
				</header>
				<main id='main' className={styles.body__main}>
					<HashRouter>
						<div className={styles.body__block}>
							<RoutesNavigation objRoutes={this.props.objRoutes} />
						</div>
						<aside id='asideLeft' className={styles.body__aside + " " + styles.body__aside_left}>
							<AsideLeft objLink={this.props.objLink!} />
						</aside>
						<aside id='asideRight' className={styles.body__aside + " " + styles.body__aside_right}></aside>
						<div id='root' className={styles.body__block}>
							{/* <MainNavigation objRoutes={this.props.objRoutes} toLink={this.state.link} /> */}
						</div>
					</HashRouter>
				</main>
				<footer id='footer' className={styles.body__footer}></footer>
			</div>
		);
	}
}

rootHeader.render(<Header textWelcom='Оглавление' />);
root.render(<Index objRoutes={myRoutes.objRoutes} objLink={myRoutes.objLink} />);
