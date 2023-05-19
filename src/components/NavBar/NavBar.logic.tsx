import { UseNavBarOptions, UseNavBarReturn } from "./NavBar.types";
import { Auth } from "aws-amplify";
import { useAuth } from "@/stores/AuthProvider";

function useLogic(options: UseNavBarOptions): UseNavBarReturn {
  const auth = useAuth();

  async function signOut() {
    try {
      await Auth.signOut();
      auth?.setAuth(false);
      localStorage.removeItem("currentUser");
      localStorage.removeItem("currentUserRole");
    } catch (error) {
      console.log("error signing out: ", error);
    }
  }

  return {
    signOut,
  };
}

export default useLogic;
