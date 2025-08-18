import { createContext, type Dispatch, useReducer } from "react";
import { initialState, type AppState, reducer, type AppAction } from "./state";

export const AppStateContext = createContext<[AppState, Dispatch<AppAction>]>([
  initialState,
  () => {},
]);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppStateContext.Provider value={[state, dispatch]}>
      {children}
    </AppStateContext.Provider>
  );
};
