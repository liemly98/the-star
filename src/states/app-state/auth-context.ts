import { createContext } from "react";

export type AuthUser = {
  uid: string;
  email: string | null;
} | null;

export const AuthContext = createContext<{
  user?: AuthUser;
  loading: boolean;
  idToken?: string;
}>({
  user: undefined,
  loading: true,
  idToken: undefined,
});
