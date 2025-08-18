import { APP_VERSIONS } from "../../constants/navigation";

export type AppState = {
  selectedVersion?: string;
};
export const initialState: AppState = {
  selectedVersion: localStorage.getItem("selectedVersion") || APP_VERSIONS[0], // Default to "General"
};

export type AppAction = { type: "SET_SELECTED_VERSION"; payload: string };

type Transducer = (state: AppState, action: AppAction) => AppState;

export const reducer: Transducer = (state, action) => {
  switch (action.type) {
    case "SET_SELECTED_VERSION":
      return {
        ...state,
        selectedVersion: action.payload,
      };

    default:
      return state;
  }
};
