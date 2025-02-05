import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

type Users = {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  phone_number: string;
  addresses: {
    street_number: string;
    street_name: string;
    postal_code: string;
    city: string;
    country: string;
  };
  ratings: {
    rating: number;
    comment: string;
    date: string;
  };
};
type UsersContextType = {
  users: Users[];
  fetchUsers: () => void;
};

const UsersContext = createContext<UsersContextType | undefined>(undefined);

export const UsersProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [users, setUsers] = useState<Users[]>([]);

  const fetchUsers = useCallback(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/users-list`)
      .then((response) => response.json())
      .then((data) => setUsers(data));
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <UsersContext.Provider value={{ users, fetchUsers }}>
      {children}
    </UsersContext.Provider>
  );
};

export const useUsers = () => {
  const context = useContext(UsersContext);
  if (!context) {
    throw new Error("useUsers must be used within an UsersProvider");
  }
  return context;
};
