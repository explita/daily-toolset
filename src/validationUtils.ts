/**
 * Checks if a given value is empty.
 *
 * A value is considered empty if it is null, undefined,
 * or if it's an object or string with no properties or characters.
 *
 * @param value The value to check.
 * @returns True if the value is empty, false otherwise.
 */
export function isEmpty(value: unknown): boolean {
  return (
    value == null ||
    value == undefined ||
    (typeof value === "string" && !value.trim().length) ||
    (typeof value === "object" && !Object.keys(value).length) ||
    (Array.isArray(value) && !value.length)
  );
}

/**
 * Checks if a given string is a valid email address.
 * @param email The string to check.
 * @returns True if the string is a valid email address, false otherwise.
 */
export function isValidEmail(email: string): boolean {
  return /\S+@\S+\.\S+/.test(email);
}

/**
 * Validates if a phone number is in the correct format. The number can be
 * given with or without an international code. The format can be with or
 * without a space or a hyphen.
 *
 * Examples of valid inputs:
 *   - +1 123-4567
 *   - 123-4567
 *   - +123 123 4567
 *   - 1234567
 *   - +1231234567
 *
 * @param phone The phone number to validate
 * @returns true if the phone number is valid, false otherwise
 */
export function isValidPhone(phone: string): boolean {
  return /^\+?(\d{1,4})?\s?-?\d{7,10}$/.test(phone);
}

/**
 * Checks if the given number is a valid number.
 *
 * This function uses the isNaN() function to check if the number is valid.
 * NaN stands for Not-a-Number and is a value that represents an invalid or
 * unreliable number. isNumeric() will return true if the number is valid and
 * false if the number is not a valid number.
 *
 * @param num The number to check
 * @returns true if the number is valid, false otherwise
 */
export function isNumeric(num: number): boolean {
  return !isNaN(num);
}
