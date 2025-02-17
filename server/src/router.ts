import express from "express";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Define orders-related routes
import ordersAction from "./modules/orders/ordersActions";

router.get("/api/orders", ordersAction.browse);
router.get("/api/orders/:id", ordersAction.readById);
router.put("/api/orders/:id", ordersAction.edit);
router.post("/api/orders", ordersAction.add);
router.delete("/api/orders/:id", ordersAction.destroy);

// Define users-related routes
import usersActions from "./modules/users/usersActions";

router.get("/api/users", usersActions.browse);
router.get("/api/users-list", usersActions.browseUsers);
router.get("/api/users/:id", usersActions.read);
router.post("/api/users", usersActions.add);
router.post("/api/auth/login", usersActions.login);
router.put("/api/users/:id/password", usersActions.editPassword);
router.put("/api/users/:id", usersActions.edit);
router.delete("/api/users/:id", usersActions.destroy);

import { adjustFilePath, upload } from "./modules/middlewares/multerUpload";
// Define photos-related routes
import photosAction from "./modules/photos/photosActions";

router.get("/api/photos", photosAction.browse);
router.get("/api/photos/:id", photosAction.read);
router.put("/api/photos/:id", upload, adjustFilePath, photosAction.edit);
router.put("/api/photos/:id/is_favorite", photosAction.editIsFavorite);
router.post("/api/photos", upload, adjustFilePath, photosAction.add);
router.delete("/api/photos/:id", photosAction.destroy);

// Define collections-related routes
import collectionsActions from "./modules/collections/collectionsActions";

router.get("/api/collections", collectionsActions.browse);
router.get("/api/collectionsPhotos", collectionsActions.browseCollection);
router.get(
  "/api/collectionsPhotosSelect",
  collectionsActions.browseSelectCollection,
);
router.get("/api/collection-articles", collectionsActions.browseArticles);
router.get("/api/collections/:id", collectionsActions.read);
router.get("/api/collections/:id/photos", collectionsActions.readCollection);
router.post("/api/collections", collectionsActions.add);
router.put("/api/collections/:id", collectionsActions.edit);
router.delete("/api/collections/:id", collectionsActions.destroy);

// Define ratings-related routes
import ratingsActions from "./modules/ratings/ratingsActions";

router.get("/api/ratings", ratingsActions.browse);
router.get("/api/ratings/:id", ratingsActions.read);
router.post("/api/ratings", ratingsActions.add);
router.delete("/api/ratings/:id", ratingsActions.destroy);

/* ************************************************************************* */

// Define address-related routes
import * as addressActions from "./modules/address/addressActions";

// Récupérer toutes les adresses
router.get("/api/addresses", addressActions.getAllAddresses);
router.get("/api/addresses/:id", addressActions.getAddressById);
router.post("/api/addresses", addressActions.addAddress);
router.put("/api/addresses/:id", addressActions.updateAddress);
router.delete("/api/addresses/:id", addressActions.deleteAddress);

/* ************************************************************************* */

export default router;
