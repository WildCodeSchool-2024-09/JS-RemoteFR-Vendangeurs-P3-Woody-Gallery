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

// Define photos-related routes
import photosAction from "./modules/photos/photosActions";

router.get("/api/photos", photosAction.browse);
router.get("/api/photos/:id", photosAction.read);
router.put("/api/photos/:id", photosAction.edit);
router.put("/api/photos/:id/is_favorite", photosAction.editIsFavorite);
router.post("/api/photos", photosAction.add);
router.delete("/api/photos/:id", photosAction.destroy);

/* ************************************************************************* */

export default router;
