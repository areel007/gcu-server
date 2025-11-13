"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Generates a random 9-digit number as a string.
 * Ensures the number doesn't start with zero.
 */
function generateRoutingNumber() {
    const min = 100000000; // smallest 9-digit number
    const max = 999999999; // largest 9-digit number
    const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
    return randomNum.toString();
}
exports.default = generateRoutingNumber;
