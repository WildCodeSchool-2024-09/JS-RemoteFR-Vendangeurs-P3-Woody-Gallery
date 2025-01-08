import express from "express";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Define orders-related routes
import ordersAction from "./modules/orders/ordersActions";

router.get("/api/orders", ordersAction.browse);
router.get("/api/orders/:id", ordersAction.read);
router.put("/api/orders/:id", ordersAction.edit);
router.post("/api/orders", ordersAction.add);
router.delete("/api/orders/:id", ordersAction.destroy);

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

// Define collections-related routes
import collectionsActions from "./modules/collections/collectionsActions";

router.get("/api/collections", collectionsActions.browse);
router.get("/api/collections/:id", collectionsActions.read);
router.post("/api/collections", collectionsActions.add);
router.put("/api/collections/:id", collectionsActions.edit);
router.put("/api/collections/:id", collectionsActions.destroy);

// Define ratings-related routes
import ratingsActions from "./modules/ratings/ratingsActions";

router.get("/api/ratings", ratingsActions.browse);
router.get("/api/ratings/:id", ratingsActions.read);
router.post("/api/ratings", ratingsActions.add);
router.delete("/api/ratings/:id", ratingsActions.destroy);

/* ************************************************************************* */

export default router;
