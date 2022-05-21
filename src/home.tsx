import React from "react";
import { Link, Outlet, Params, Route, Routes, useParams } from "react-router-dom";
import { HashRouter } from "react-router-dom";
import ExPython_small from "./image/ExPython_small.png";
import styles from "./home.module.css";

interface Props {}

interface State {
	st: JSX.Element;
}

export class MainPage extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = { st: <p>sad</p> };
	}
	render(): React.ReactNode {
		return (
			<div className={styles.article}>
				<h1 className={styles.title}>Книга проектов</h1>
				<p className={styles.section}>
					<strong>Книга проектов</strong> представляет собой решение задач на языке <q>JavaScript</q> из книги{" "}
					<q>
						<cite>Большая книга проектов Python</cite>
					</q>
					.
				</p>
				<img
					className={styles.imgLogo}
					src={ExPython_small}
					title='Большая книга проектов Python'
					alt='img: Большая книга проектов Python'
				/>
				<Outlet />
			</div>
		);
	}
}

export class OtherPage extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
	}
	render(): React.ReactNode {
		return (
			<div>
				<p>Page not founded !!!</p>
			</div>
		);
	}
}
