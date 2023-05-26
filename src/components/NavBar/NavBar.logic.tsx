import { UseNavBarOptions, UseNavBarReturn } from "./NavBar.types";
import { useUserActions } from "@/hooks/userUserActions";

function useLogic(options: UseNavBarOptions): UseNavBarReturn {
	const { signOut } = useUserActions();

	return {
		signOut,
	};
}

export default useLogic;
