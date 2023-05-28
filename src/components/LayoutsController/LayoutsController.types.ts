import { ReactNode } from "react";

export type Layout = "withNavBar" | "default"

export type LayoutControllerProps = {
	children: ReactNode;
	name: Layout
};