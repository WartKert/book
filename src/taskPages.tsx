import React from "react";
import { Params, useParams } from "react-router-dom";
import { Task17Page } from "./task17Page";

interface Props {}

interface State {
	st: JSX.Element;
}

export function TaskPages(props: Props): JSX.Element {
	const par: Params<string> = useParams();
	switch (par.id) {
		case "17":
			return <Task17Page />;
		case "19":
			return <Task17Page />;

		default:
			return <p>Task not founded.</p>;
	}
}
