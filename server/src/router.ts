import express from "express";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Define orders-related routes
import ordersAction from "./modules/orders/ordersActions";

router.get("/api/orders", ordersAction.browse);
router.get("/api/orders/:id", ordersAction.read);
router.put("/api/orders", ordersAction.edit);
router.post("/api/orders", ordersAction.add);
router.delete("/api/orders", ordersAction.destroy);

// Define users-related routes
import usersActions from "./modules/users/usersActions";

router.get("/api/users", usersActions.browse);
router.get("/api/users/:id", usersActions.read);
router.post("/api/users", usersActions.add);
router.put("/api/users/:id", usersActions.editFirstname);
router.put("/api/users/:id", usersActions.editLastname);
router.put("/api/users/:id", usersActions.editEmail);
router.put("/api/users/:id", usersActions.editPhoneNumber);
router.put("/api/users/:id", usersActions.editPassword);
router.delete("/api/users/:id", usersActions.destroy);

/* ************************************************************************* */

export default router;
