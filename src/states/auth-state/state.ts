import type { User } from "firebase/auth";

export interface AppState {
  idToken?: string;
  user?: User;
  isLoggedIn?: boolean;
  loading?: boolean;
}

export const initialState: AppState = {
  isLoggedIn: false,
  loading: true,
  idToken: undefined,
  user: undefined,
};

export type AppAction =
  | {
      type: "LOGIN";
      payload: {
        idToken: string;
        user: User;
      };
    }
  | { type: "LOGOUT" }
  | { type: "SET_LOADING"; payload: boolean };

type Transducer = (state: AppState, action: AppAction) => AppState;

export const reducer: Transducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        idToken: action.payload.idToken,
        user: action.payload.user,
        isLoggedIn: true,
        loading: false, // Set loading to false after login
      };
    case "LOGOUT":
      return {
        ...state,
        idToken: undefined,
        user: undefined,
        isLoggedIn: false,
        loading: false, // Set loading to false after logout
      };

    case "SET_LOADING":
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
};
