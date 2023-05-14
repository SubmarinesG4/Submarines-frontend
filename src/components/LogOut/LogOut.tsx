import { Auth } from 'aws-amplify';
import { useAuth } from "@/stores/AuthProvider";

export default function logOut(){
    const auth = useAuth();

    async function signOut() {
        try {
            await Auth.signOut();
            auth?.setAuth(false);
            localStorage.removeItem("currentUser");
        } catch (error) {
            console.log('error signing out: ', error);
        }
    }
    
    return (
        <button onClick={() => {signOut()}}>Logout</button>
    );
}