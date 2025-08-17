import { useReducer, type ReactNode } from "react";
import { AppStateContext, AppDispatchContext } from "./app-context";

// Define your state shape
export interface AppState {
  user: null | { uid: string; email: string | null };
  sidebarOpen: boolean;
  isLoading: boolean;
}

// Define actions
export type AppAction =
  | { type: "LOGIN"; payload: { uid: string; email: string | null } }
  | { type: "LOGOUT" }
  | { type: "TOGGLE_SIDEBAR" }
  | { type: "SET_LOADING"; payload: boolean };

// Initial state
const initialState: AppState = {
  user: null,
  sidebarOpen: false,
  isLoading: false,
};

// Reducer function
function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.payload };
    case "LOGOUT":
      return { ...state, user: null };
    case "TOGGLE_SIDEBAR":
      return { ...state, sidebarOpen: !state.sidebarOpen };
    case "SET_LOADING":
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
}

// Provider
export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);
  return (
    <AppStateContext.Provider value={state}>
      <AppDispatchContext.Provider value={dispatch}>
        {children}
      </AppDispatchContext.Provider>
    </AppStateContext.Provider>
  );
}
