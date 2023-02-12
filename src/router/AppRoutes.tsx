import { useAuthStore } from "@/stores";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";

export default function AppRoutes() {
	const auth = useAuthStore((state) => state.auth);

	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={auth ? <Home /> : <Navigate to="/login" replace />} />
				<Route path="/login" element={auth ? <Navigate to="/" replace /> : <Login />} />
			</Routes>
		</BrowserRouter>
	);
}
