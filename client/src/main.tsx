// Import necessary modules from React and React Router
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";

/* ************************************************************************* */

import App from "./App";
import AuthAdmin from "./components/AuthAdmin";
import AuthUser from "./components/AuthUser";
import Account from "./components/UserAccount/Account";
import Addresses from "./components/UserAccount/AccountAddresses";
import FavoriteAccount from "./components/UserAccount/AccountFavorite";
import AccountOrders from "./components/UserAccount/AccountOrders";
import AccountPayment from "./components/UserAccount/AccountPayment";
import AccountPage from "./pages/AccountPage";
import AdminPage from "./pages/AdminPage";
import ArticlePage from "./pages/ArticlePage";
import ConnectionPage from "./pages/ConnectionPage";
import CreateAccountPage from "./pages/CreateAccountPage";
import Homepage from "./pages/Homepage";
import OrderPage from "./pages/OrderPage";
import ShopPage from "./pages/ShopPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <Homepage /> },
      { path: "shop", element: <ShopPage /> },
      { path: "panier", element: <OrderPage /> },
      { path: "shop/article/:id", element: <ArticlePage /> },
      { path: "login", element: <ConnectionPage /> },
      { path: "create-account", element: <CreateAccountPage /> },
      // CONNEXION CLIENT
      {
        path: "user",
        element: <AuthUser />,
        children: [
          {
            path: ":name",
            element: <AccountPage />,
            children: [
              { path: "", element: <Account /> },
              { path: "addresses", element: <Addresses /> },
              { path: "orders", element: <AccountOrders /> },
              { path: "favorites", element: <FavoriteAccount /> },
              { path: "payment", element: <AccountPayment /> },
            ],
          },
        ],
      },
      // CONNEXION ADMIN
      {
        path: "admin",
        element: <AuthAdmin />,
        children: [
          { path: "articles", element: <AdminPage /> },
          { path: "users", element: <AdminPage /> },
          { path: "orders", element: <AdminPage /> },
          { path: "logout", element: <AdminPage /> },
        ],
      },
    ],
  },
]);

const rootElement = document.getElementById("root");
if (rootElement == null) {
  throw new Error(`Your HTML Document should contain a <div id="root"></div>`);
}

// Render the app inside the root element
createRoot(rootElement).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
);
