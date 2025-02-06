import { Outlet } from "react-router-dom";
import "./App.css";
import Footer from "./components/Layout/Footer";
import Header from "./components/Layout/Header";

if (localStorage.getItem("isAuth") === null) {
  localStorage.setItem("isAuth", "false");
}

if (localStorage.getItem("isAdmin") === null) {
  localStorage.setItem("isAdmin", "false");
}

function App() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
