import { Router } from "express";
import {
  createUser,
  getAllUsers,
  getUserById,
  loginUser,
} from "../controllers/user";

const router = Router();

router.route("/create").post(createUser);
router.route("/login").post(loginUser);
router.route("/:id").get(getUserById);
router.route("/").get(getAllUsers);

export default router;
