import { UseNavBarOptions, UseNavBarReturn } from "./NavBar.types";
import { Auth } from "aws-amplify";
import { useAuth } from "@/stores/AuthProvider";
import { useNavigate } from "react-router-dom";

function useLogic(options: UseNavBarOptions): UseNavBarReturn {
  const auth = useAuth();
  const navigate = useNavigate();

  async function signOut() {
    try {
      await Auth.signOut();
      auth?.setAuth(false);
      localStorage.removeItem("currentUser");
      localStorage.removeItem("currentUserRole");
      console.log("user signed out");
    } catch (error) {
      console.log("error signing out: ", error);
    }
  }

  function navigateTo(path: string) {
    navigate(path);
  }

  return {
    signOut,
    navigateTo,
  };
}

export default useLogic;
