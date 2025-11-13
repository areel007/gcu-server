/**
 * Generates a random 9-digit number as a string.
 * Ensures the number doesn't start with zero.
 */
function generateRoutingNumber(): string {
  const min = 100_000_000; // smallest 9-digit number
  const max = 999_999_999; // largest 9-digit number
  const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
  return randomNum.toString();
}

export default generateRoutingNumber;
