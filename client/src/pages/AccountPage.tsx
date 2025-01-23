import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

type User = {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  phone_number?: string;
};

export default function AccountPage() {
  const { logout } = useAuth();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const navigate = useNavigate();

  const userId = sessionStorage.getItem("user");

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/users/${userId}`)
      .then((response) => response.json())
      .then((data: User) => setCurrentUser(data));
  });

  const handleDeconnect = () => {
    localStorage.clear();
    logout;
    navigate("/");
    window.location.reload();
  };

  return (
    <>
      <h2>
        Page du compte de {currentUser?.firstname} {currentUser?.lastname}{" "}
      </h2>
      <p>User ID: {currentUser?.id} </p>
      <button type="button" onClick={handleDeconnect}>
        Déconnection
      </button>
    </>
  );
}
