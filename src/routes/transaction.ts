import { Router } from "express";
import {
  creditController,
  getTransactions,
  transferController,
} from "../controllers/transfer";

const router = Router();

router.route("/:id").get(getTransactions);
router.route("/transfer/:id").post(transferController);
router.route("/credit/:id").post(creditController);

export default router;
