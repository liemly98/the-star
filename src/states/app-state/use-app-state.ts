import { useContext } from "react";
import { AppStateContext } from "./context";

export const useAppState = () => {
  const [state, dispatch] = useContext(AppStateContext);
  const selectedVersion = state.selectedVersion;

  const setSelectedVersion = (version: string) => {
    dispatch({ type: "SET_SELECTED_VERSION", payload: version });
  };

  return { state, selectedVersion, setSelectedVersion } as const;
};
