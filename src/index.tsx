import React, { ReactComponentElement, ReactNode } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Header from "./header";
import Main from "./main";
import styles from "./index.module.css";
import { HashRouter, Route, Router, Routes, Link, NavigationType, To } from "react-router-dom";
import { MainPage, OtherPage } from "./home";
import { AsideLeft } from "./aside";

import { isPropertySignature } from "typescript";
import { RouteProps, IndexRouteProps, NavigateFunction, LinkProps } from "react-router-dom";
import path from "path";
import type { navType } from "./myTypeNavigate";
import { LinkNavigation, RoutesNavigation } from "./Navigation";

import imgMenu from "./image/menu.png";
import imgHome64 from "./image/home-64.png";
import imgTaskRun64 from "./image/task-runner-64.png";
import { eventNames } from "process";
import { Style } from "util";
import { TaskPages } from "./taskPages";

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
	objIcon: {
		[key: string]: navType.arrIcon;
	};
}

let myRoutes: Props = {
	objRoutes: {
		index: { path: "/", element: <MainPage /> },
		tasks: { path: "/task:id", element: <TaskPages /> },
		other: { path: "*", element: <OtherPage /> },
	},
	objLink: {
		index: { to: "/", text: "Главная страница" },
		tasks: { to: "/task17", text: "Задачи" },
	},
	objIcon: {
		home: { image: imgHome64, to: "/", text: "Главная страница" },
		task17: { image: imgTaskRun64, to: "/task17", text: "Задача 17" },
		task19: { image: imgTaskRun64, to: "/task19", text: "Задача 19" },
	},
};

interface State {
	link?: LinkProps["to"];
	childStyle?: Style;
	elem?: IndexRouteProps["element"];
}

class Index extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.closeAside = this.closeAside.bind(this);
		this.state = { childStyle: "0" as Style };
	}

	closeAside(event: any) {
		if (event.target.class != event) {
		}
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
							<AsideLeft objLink={this.props.objLink!} objIcon={this.props.objIcon} />
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
root.render(<Index objRoutes={myRoutes.objRoutes} objLink={myRoutes.objLink} objIcon={myRoutes.objIcon} />);
