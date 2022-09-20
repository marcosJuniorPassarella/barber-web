import { createContext, ReactNode, useState } from "react";
import Router from "next/router";
import { destroyCookie } from "nookies";

interface AuthContextData {
  user: UserProps;
  isAuthenticated: boolean;
  signIn: (credentials: SignInProps) => Promise<void>;
}

interface UserProps {
  id: string;
  name: string;
  email: string;
  endereco: string | null;
  subscriptions?: SubscriptionProps | null;
}

interface SubscriptionProps {
  id: string;
  status: string;
}

type AuthProviderProps = {
  children: ReactNode;
};

interface SignInProps {
  email: string;
  password: string;
}

export const AuthContext = createContext({} as AuthContextData);

export function signOut() {
  console.log("Error Logout");
  try {
    destroyCookie(null, "@barber.token", { path: "/" });
    Router.push("/login");
  } catch (error) {
    console.log("Erro ao sair");
  }
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserProps>();
  // Se tiver dados a isAuthenticated será true senão será false
  const isAuthenticated = !!user;

  async function signIn({ email, password }: SignInProps) {
    console.log({
      email,
      password,
    });
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn }}>
      {children}
    </AuthContext.Provider>
  );
}
