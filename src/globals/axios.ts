import Auth from "@aws-amplify/auth";
import axios from "axios";

export async function getDefaulHeaders() { 
    const user = await Auth.currentAuthenticatedUser();
    const token = user.signInUserSession?.idToken?.jwtToken;
    const group = user.signInUserSession.accessToken.payload["cognito:groups"];
    return {headers: {'Authorization': `Bearer ${token}`, 'Group': group}};
}

export async function getData(url: string) {
    const defHeaders = await getDefaulHeaders();
	console.log(defHeaders);
    return axios.get(url,  defHeaders );
}

export async function putData(url: string, data: unknown) {
    const defHeaders = await getDefaulHeaders();
    return axios.put(url, data, defHeaders);
}