"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = __importDefault(require("./user"));
const transaction_1 = __importDefault(require("./transaction"));
const router = (0, express_1.Router)();
router.use("/user", user_1.default);
router.use("/transactions", transaction_1.default);
exports.default = router;
