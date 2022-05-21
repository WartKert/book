import { RouteProps, IndexRouteProps, NavigateFunction, LinkProps } from "react-router-dom";

export namespace navType {
	export interface arrRoute {
		path: RouteProps["path"];
		element: IndexRouteProps["element"];
	}

	export interface arrLink {
		to: LinkProps["to"];
		text: string;
	}

	export interface arrIcon {
		image: string;
		to: LinkProps["to"];
		text: string;
	}
}
