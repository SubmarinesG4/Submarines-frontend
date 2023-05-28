import { Layout } from "@/components/LayoutsController/LayoutsController.types";
import { ReactNode } from "react";
import { UserRole } from "./User";

export type Route = {
	path: string;
	roles?: UserRole[];
	element: (roles: UserRole[], userTenant?: string) => ReactNode;
	redirectElement: (roles: UserRole[]) => ReactNode;
	layout: Layout
};

export type Routes = Route[]