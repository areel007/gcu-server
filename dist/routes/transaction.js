"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const transfer_1 = require("../controllers/transfer");
const router = (0, express_1.Router)();
router.route("/:id").get(transfer_1.getTransactions);
router.route("/transfer/:id").post(transfer_1.transferController);
router.route("/credit/:id").post(transfer_1.creditController);
exports.default = router;
