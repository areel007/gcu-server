import { Router } from "express";
import user from "./user";
import transactions from "./transaction";

const router = Router();

router.use("/user", user);
router.use("/transactions", transactions);

export default router;
