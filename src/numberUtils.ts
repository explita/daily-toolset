/**
 * Generates a random number with a specified length.
 *
 * @param {number} [length=8] The length of the random number to generate.
 * @returns {number} A random number with the specified length.
 */
export function randomNumber(length: number = 8): number {
  const min = Math.pow(10, length - 1);
  const max = Math.pow(10, length) - 1;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Calculates a percentage from a total value and a value to calculate from.
 *
 * @param total The total value.
 * @param calculateFrom The value to calculate the percentage from.
 * @returns The percentage as a number (0-100). If total is zero, returns 0.
 */
export function getPercentage(total: number, calculateFrom: number): number {
  if (total === 0) return 0; // Avoid division by zero
  return calculateFrom ? (calculateFrom / total) * 100 : 0;
}
