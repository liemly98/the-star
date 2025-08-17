import { createContext } from "react";
import type { AppState, AppAction } from "./app-state";

export const AppStateContext = createContext<AppState | undefined>(undefined);
export const AppDispatchContext = createContext<
  React.Dispatch<AppAction> | undefined
>(undefined);
