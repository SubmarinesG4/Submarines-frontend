import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes as RouterRoutes, useLocation, useParams } from "react-router-dom";

import LayoutsController from "@/components/LayoutsController";

import { useUserActions } from "@/hooks/userUserActions";
import { useAppSelector } from "@/app/store";
import { UserRole } from "@/types/User";
import routes from "./routes";

export default function AppRoutes() {
	return (
		<BrowserRouter>
			<Routes />
		</BrowserRouter>
	);
}

function Routes() {
	const { setCurrentSession } = useUserActions();
	const user = useAppSelector((state) => state.userSlice.user);
	const [sessionChecked, setSessionChecked] = useState(false);

	useEffect(() => {
		async function checkSession() {
			await setCurrentSession();
			setSessionChecked(true);
		}
		checkSession();
	}, []);

	function checkRouteAuthorization(pathRoles: UserRole[] | undefined, userRoles: UserRole[]) {
		if (!pathRoles) return true;
		return pathRoles.some((pathRole) => userRoles.includes(pathRole));
	}

	if (!sessionChecked) return null;
	return (
		<LayoutsController>
			<RouterRoutes>
				{routes.map((route) => {
					const userRoles: UserRole[] = user?.roles || ["unauthenticated"];
					const userTenant = user?.attributes["custom:tenantId"];
					let element = route.element;
					return (
						<Route
							key={route.path}
							path={route.path}
							element={
								checkRouteAuthorization(route.roles, userRoles)
									? element(userRoles, userTenant)
									: route.redirectElement(userRoles)
							}
						/>
					);
				})}
			</RouterRoutes>
		</LayoutsController>
	);
}
