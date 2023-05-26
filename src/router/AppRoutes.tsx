import { BrowserRouter, Navigate, Route, Routes as RouterRoutes } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import ResetPassword from "@/pages/ResetPassword";
import Translations from "@/pages/Translations";
import Tenants from "@/pages/Tenants";
import Tenant from "@/pages/Tenant";
import { useEffect, useState } from "react";
import { useUserActions } from "@/hooks/userUserActions";
import { useSelector } from "react-redux";
import { useAppSelector } from "@/app/store";

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

	if (!sessionChecked) return null;
	return (
		<RouterRoutes>
			<Route path="/" element={!!user ? <Navigate to="/home" replace /> : <Navigate to="/login" replace />} />
			<Route path="/login" element={!!user ? <Navigate to="/home" replace /> : <Login />} />
			<Route path="/resetPassword" element={!!user ? <Navigate to="/home" replace /> : <ResetPassword />} />
			<Route path="/home" element={!!user ? <Home /> : <Navigate to="/login" replace />} />
			<Route path="/translations" element={!!user ? <Translations /> : <Navigate to="/login" replace />} />
			<Route path="/tenants" element={!!user ? <Tenants /> : <Navigate to="/login" replace />} />
			<Route path="/tenant/:id" element={!!user ? <Tenant /> : <Navigate to="/login" replace />} />
		</RouterRoutes>
	);
}
