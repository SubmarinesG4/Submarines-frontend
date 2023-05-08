import { useAuth } from "@/stores/AuthProvider";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Registration from "../pages/Registration"
import ResetPassword from "@/pages/ResetPassword";

export default function AppRoutes() {
	const auth = useAuth();

	return (
		<BrowserRouter>
			<Routes>
                <Route path='/' element={
                    auth?.auth ?
                        <Navigate to="/home" replace /> :
                        <Navigate to="/login" replace />
                } />
                <Route path="/login" element={
                    auth?.auth ?
                        <Navigate to="/home" replace /> :
                        <Login />
                } />
                <Route path="/resetPassword" element={
                    auth?.auth ?
                        <Navigate to="/home" replace /> :
                        <ResetPassword />
                } />
                <Route path="/home" element={
                    auth?.auth ?
                        <Home /> :
                        <Navigate to="/login" replace />
                } />
            </Routes>
		</BrowserRouter>
	);
}
