import { createContext, useContext, useState } from "react";

type User = {
  id: number;
  email: string;
  isAdmin: boolean;
  name: string;
};

type AuthContextProps = {
  user: User | null;
  isAuth: boolean;
  rating: boolean;
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
  const [rating, setRating] = useState<boolean>(false);

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
          credentials: "include",
        },
      );

      if (!response.ok) {
        throw new Error("Identifiants erronés");
      }

      const data = await response.json();

      const loggedUser = {
        id: data.user.id,
        email: data.user.email,
        isAdmin: data.user.isAdmin,
        name: data.user.name,
      };

      setRating(data.user.rating === null);

      setUser(loggedUser);

      if (loggedUser) {
        localStorage.setItem("isAuth", "true");
        sessionStorage.setItem("user", `${loggedUser.id}`);
        sessionStorage.setItem("userName", `${loggedUser.name}`);
      }

      if (loggedUser.isAdmin) {
        localStorage.setItem("isAdmin", "true");
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
    localStorage.removeItem("isAuth");
    localStorage.removeItem("isAdmin");
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("userName");
  };

  return (
    <AuthContext.Provider value={{ user, rating, isAuth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
