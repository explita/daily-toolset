/**
 * Capitalizes the first letter of a string
 *
 * @example
 * capitalize("hello") // "Hello"
 */

export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

/**
 * Converts a string to a URL-friendly slug
 *
 * @example
 * slugify("Hello World") // "hello-world"
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "");
}

/**
 * Converts a camelCase string to Title Case
 *
 * @example
 * const result = camelToTitle('helloWorld');
 * console.log(result);
 * // Output: "Hello World"
 */
export function camelToTitle(str: string): string {
  return str.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase());
}

/**
 * Parses the query string from a URL and returns it as an object.
 *
 * @param url - The URL containing the query string to parse.
 * @returns An object where each key-value pair represents a parameter from the query string.
 */
export const parseQueryString = (url: string): Record<string, string> => {
  const queryString = url.split("?")[1];
  return Object.fromEntries(new URLSearchParams(queryString));
};

/**
 * Builds a query string from a given object, string, or URLSearchParams.
 *
 * @example
 * buildQueryString({ foo: 'bar' }) // "foo=bar"
 * buildQueryString("foo=bar") // "foo=bar"
 * buildQueryString([["foo", "bar"]]) // "foo=bar"
 * buildQueryString(new URLSearchParams("foo=bar")) // "foo=bar"
 * buildQueryString(undefined) // ""
 * @param {string | Record<string, string> | string[][] | URLSearchParams | undefined} params
 * @returns {string}
 */
export const buildQueryString = (
  params:
    | string
    | Record<string, string>
    | string[][]
    | URLSearchParams
    | undefined
): string => {
  return new URLSearchParams(params).toString();
};

/**
 * Appends the correct ordinal suffix to a number.
 *
 * @example
 * addOrdinal(1) // "1st"
 * addOrdinal(2) // "2nd"
 * addOrdinal(3) // "3rd"
 * addOrdinal(4) // "4th"
 * addOrdinal(11) // "11th"
 * @param {number} num
 * @returns {string}
 */
export function addOrdinal(num: number): string {
  if (![11, 12, 13].includes(num % 100)) {
    switch (num % 10) {
      // Handle 1st, 2nd, 3rd
      case 1:
        return `${num}st`;
      case 2:
        return `${num}nd`;
      case 3:
        return `${num}rd`;
    }
  }
  return `${num}th`;
}

/**
 * Splits a number or string into chunks of a specified size, separated by a
 * separator string.
 *
 * @example
 * chunkSplit(123456789, 3, ",") // "123,456,789"
 * @param {number|string} data The number or string to split.
 * @param {number} [groupSize=3] The size of each chunk.
 * @param {string} [separator=" "] The separator string to use between chunks.
 * @returns {string}
 */
export function chunkSplit(
  data: number | string,
  groupSize: number = 3,
  separator: string = " "
): string {
  const numberString = data.toString();

  const groups: string[] = [];
  for (let i = numberString.length; i > 0; i -= groupSize) {
    groups.unshift(numberString.slice(Math.max(0, i - groupSize), i));
  }

  return groups.join(separator);
}

/**
 * Generates a random string of a specified length, optionally with
 * characters suitable for a strong password.
 *
 * @example
 * uniqueString(16) // "jxdu6r7h3m4"
 * uniqueString(16, true) // "jxdu6r7h3m4!" (with password characters)
 * @param {number} [length=10] The length of the string to generate.
 * @param {boolean} [isPassword=false] Whether to include characters suitable
 *   for a strong password.
 * @returns {string} The generated random string.
 */
export function uniqueString(
  length: number = 10,
  isPassword: boolean = false
): string {
  let chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

  if (isPassword) {
    chars += "!@#$%^&*()_+-=[]{}|;':\",./<>?";
  }

  let uniqueString = "";

  for (let i = 0; i < length; i++) {
    uniqueString += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return uniqueString;
}

/**
 * Formats a number as a currency string, with optional currency symbol.
 *
 * @example
 * formatCurrency(1234.56, "$") // "$1,234.56"
 * formatCurrency(987654.32) // "987,654.32"
 *
 * @param {number} amount The amount to format as currency.
 * @param {string} [currency=""] The currency symbol to prepend to the formatted amount.
 * @returns {string} The formatted currency string.
 */
export function formatCurrency(amount: number, currency: string = ""): string {
  return `${currency}${amount.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}
