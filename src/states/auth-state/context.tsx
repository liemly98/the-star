import { createContext, type Dispatch, useEffect, useReducer } from "react";
import { initialState, reducer, type AppAction, type AppState } from "./state";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../lib/firebase";

export const AuthStateContext = createContext<[AppState, Dispatch<AppAction>]>([
  initialState,
  () => {},
]);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        user.getIdToken().then((token) => {
          dispatch({
            type: "LOGIN",
            payload: {
              idToken: token,
              user: user,
            },
          });
        });
      } else {
        dispatch({ type: "SET_LOADING", payload: false });
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthStateContext.Provider value={[state, dispatch]}>
      {children}
    </AuthStateContext.Provider>
  );
};
