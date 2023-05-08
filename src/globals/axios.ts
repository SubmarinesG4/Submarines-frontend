import Auth from "@aws-amplify/auth";
import axios from "axios";

async function getDefaulHeaders() {
	const user = await Auth.currentAuthenticatedUser();
    const token = user.signInUserSession?.idToken?.jwtToken;
    return {headers: {'Authorization': `Bearer ${token}`}}
}

const axiosInstance = axios.create({
	baseURL: 'http://localhost:3000/dev/',
	timeout: 1000,
});

export async function getData<T>(url: string) {
	const defHeaders = await getDefaulHeaders();
	return axiosInstance.get<T>(url, defHeaders);
}

export async function putData<T>(url: string, data: unknown) {
	const defHeaders = await getDefaulHeaders();
	return axiosInstance.put<T>(url, data, defHeaders);
}