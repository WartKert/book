import React from "react";
import { Link, Routes, Route } from "react-router-dom";
import type { navType } from "./myTypeNavigate";

interface RoutesProps {
	objRoutes: {
		[key: string]: navType.arrRoute;
	};
}

interface LinkProps {
	objLink: {
		[key: string]: navType.arrLink;
	};
}

export class LinkNavigation extends React.Component<LinkProps> {
	constructor(props: LinkProps) {
		super(props);
	}

	render(): React.ReactNode {
		return (
			<React.Fragment>
				<ul>
					{Object.entries(this.props.objLink).map((item) => {
						return (
							<li>
								<Link to={item[1].to}>{item[1].text}</Link>
							</li>
						);
					})}
				</ul>
			</React.Fragment>
		);
	}
}

export class RoutesNavigation extends React.Component<RoutesProps> {
	constructor(props: RoutesProps) {
		super(props);
	}

	render(): React.ReactNode {
		return (
			<React.Fragment>
				<Routes>
					{Object.entries(this.props.objRoutes).map((item) => {
						return <Route path={item[1].path} element={item[1].element} key={item[0]} />;
					})}
				</Routes>
			</React.Fragment>
		);
	}
}
