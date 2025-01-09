import express from "express";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Define item-related routes
import itemActions from "./modules/item/itemActions";

router.get("/api/items", itemActions.browse);
router.get("/api/items/:id", itemActions.read);
router.post("/api/items", itemActions.add);

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
