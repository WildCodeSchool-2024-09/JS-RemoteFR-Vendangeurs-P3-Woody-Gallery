import { createContext, useContext, useState } from "react";

type User = {
  email: string;
  isAdmin: boolean;
  name: string;
};

type AuthContextProps = {
  user: User | null;
  isAuth: boolean;
  login: (email: string, password: string) => Promise<User | null>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth doit être utilisé dans ce cas");
  }

  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);

  const isAuth = user !== null;

  const login = async (
    email: string,
    password: string,
  ): Promise<User | null> => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        },
      );

      if (!response.ok) {
        throw new Error("Identifiants erronés");
      }

      const data = await response.json();

      const loggedUser = {
        email: data.user.email,
        isAdmin: data.user.isAdmin,
        name: data.user.name,
      };

      setUser(loggedUser);

      if (loggedUser.isAdmin) {
        localStorage.setItem("isAdmin", "true");
      }
      if (loggedUser) {
        localStorage.setItem("isAuth", "true");
      }

      return loggedUser;
    } catch (error) {
      console.error("Login raté : ", error);
      alert("Identifiants erronés !");
      return null;
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isAuth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
