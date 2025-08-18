import { useContext } from "react";
import { AuthStateContext } from "./context";

export const useAuthState = () => {
  const [state, dispatch] = useContext(AuthStateContext);

  const userLogin = (payload: { idToken: string; user: any }) => {
    dispatch({ type: "LOGIN", payload });
  };

  const userLogout = () => {
    dispatch({ type: "LOGOUT" });
  };

  return { state, userLogin, userLogout } as const;
};
