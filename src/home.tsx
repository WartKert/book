import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import { HashRouter } from "react-router-dom";

interface Props {}

interface State {
	st: JSX.Element;
}

export class HomePage extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = { st: <p>sad</p> };
	}

	render(): React.ReactNode {
		return (
			<div>
				<h2>dsdsd</h2>
			</div>
		);
	}
}

interface Props {
	text: string;
}

class Main extends React.Component<Props> {
	imgLogo: JSX.Element = (<img className='imgLogo' src='image/ExPython_small.png' />);
	textHead: JSX.Element = (
		<div>
			<h1>Книга проектов</h1>
		</div>
	);
	textMain: JSX.Element = (
		<p>
			<strong>Книга проектов</strong> представляет собой решение задач на языке <q>JavaScript</q> из книги
			<q>
				<cite className='showLogo'>
					Большая книга проектов Python
					{this.imgLogo}
				</cite>
			</q>
			.
		</p>
	);

	constructor(props: Props, ...any: string[]) {
		super(props);
	}

	render(): React.ReactNode {
		return (
			<div>
				{this.textHead}
				{this.textMain}
			</div>
		);
	}
}
