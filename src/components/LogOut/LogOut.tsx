import { useUserActions } from "@/hooks/userUserActions";

export default function logOut() {
	const { signOut } = useUserActions();

	return <button onClick={signOut}>Logout</button>;
}
