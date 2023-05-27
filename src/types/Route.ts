import { ReactNode } from "react";
import { UserRole } from "./User";

export type Route = {
	path: string;
	roles?: UserRole[];
	element: (roles: UserRole[], userTenant?: string) => ReactNode;
	redirectElement: (roles: UserRole[]) => ReactNode;
};

export type Routes = Route[]