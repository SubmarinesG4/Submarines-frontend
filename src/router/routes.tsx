import Login from "@/pages/Login";
import ResetPassword from "@/pages/ResetPassword";
import Tenant from "@/pages/Tenant";
import Tenants from "@/pages/Tenants";
import Translations from "@/pages/Translations";
import { Routes } from "@/types/Route";
import { Navigate } from "react-router-dom";

const routes: Routes = [
	{
		path: "/",
		element: (roles, userTenant) =>
			roles.includes("super-admin") ? (
				<Navigate to="/tenants" replace />
			) : (
				<Navigate to={`/translations/${userTenant}`} replace />
			),
		roles: ["super-admin", "admin", "traduttore"],
		redirectElement: () => <Navigate to="/login" replace />,
	},
	{
		path: "/login",
		element: () => <Login />,
		roles: ["unauthenticated"],
		redirectElement: () => <Navigate to="/" replace />,
	},
	{
		path: "/resetPassword",
		element: () => <ResetPassword />,
		roles: ["unauthenticated"],
		redirectElement: () => <Navigate to="/" replace />,
	},
	{
		path: "/translations/:id",
		element: () => <Translations />,
		roles: ["super-admin", "admin", "traduttore"],
		redirectElement: () => <Navigate to="/login" replace />,
	},
	{
		path: "/tenant/:id",
		element: () => <Tenant />,
		roles: ["super-admin", "admin", "traduttore"],
		redirectElement: () => <Navigate to="/login" replace />,
	},
	{
		path: "/tenants",
		element: () => <Tenants />,
		roles: ["super-admin"],
		redirectElement: () => <Navigate to="/login" replace />,
	},
];

export default routes;
