import express from "express";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

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
