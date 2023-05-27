import { setUser } from "@/app/slices/userSlice";
import { useAppDispatch } from "@/app/store"
import { Auth } from "aws-amplify";
import { useNavigate } from "react-router-dom";

export const useUserActions = () => {
	const dispatch = useAppDispatch()
	const navigate = useNavigate();

	async function signOut() {
		try {
			await Auth.signOut();
			dispatch(setUser(null))
			localStorage.removeItem("authToken");
			console.log("user signed out");
			navigate("/login")
		} catch (error) {
			console.log("error signing out: ", error);
		}
	}

	async function signIn(email: string, password: string) {
		return await Auth.signIn(email, password);
	}

	async function setCurrentSession() {
		try {
			const user = await Auth.currentAuthenticatedUser()
			if (!user) {
				throw "No current user"
			}
			let userGroup = user.signInUserSession.accessToken.payload["cognito:groups"];
			userGroup = Array.isArray(userGroup) ? userGroup : userGroup[0];
			dispatch(
				setUser({
					username: user.username,
					roles: userGroup,
					attributes: user.attributes,
				})
			);
			localStorage.setItem("authToken", user.signInUserSession?.idToken?.jwtToken);
		} catch (e) {
			navigate("/login")
		}
	}

	async function getNewPassword(user: any, password: string) {
		return await Auth.completeNewPassword(user, password)
	}

	return {
		signOut,
		signIn,
		setCurrentSession,
		getNewPassword
	}
}