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

/* ************************************************************************* */

export default router;
