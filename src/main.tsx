import { stringify } from "querystring";
import React from "react";

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

export default Main;
