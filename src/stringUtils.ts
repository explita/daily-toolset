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

type ChunkSplitParams = {
  groupSize?: number;
  separator?: string;
};

/**
 * Splits a number or string into chunks of a specified size, separated by a specified separator.
 *
 * @param {Object} params - The parameters for the function.
 * @param {number|string} params.data - The number or string to split into chunks.
 * @param {number} [params.groupSize=3] - The size of each chunk (default is 3).
 * @param {string} [params.separator=" "] - The string used to separate chunks (default is a space).
 * @returns {string} - The resulting string with chunks separated by the specified separator.
 *
 * @example
 * chunkSplit({ data: 123456789, groupSize: 3, separator: "," }) // "123,456,789"
 */
export function chunkSplit(
  data: number | string,
  { groupSize = 3, separator = " " }: ChunkSplitParams = {}
): string {
  const numberString = data.toString();

  const groups: string[] = [];
  for (let i = numberString.length; i > 0; i -= groupSize) {
    groups.unshift(numberString.slice(Math.max(0, i - groupSize), i));
  }

  return groups.join(separator);
}

type UniqueStringParams = {
  length?: number;
  isPassword?: boolean;
};

/**
 * Generates a unique string of a specified length with optional special characters.
 *
 * @param {Object} params - The parameters for the function.
 * @param {number} [params.length=10] - The length of the unique string to generate (default is 10).
 * @param {boolean} [params.isPassword=false] - If true, includes special characters for passwords (default is false).
 * @returns {string} - The generated unique string.
 *
 * @example
 * uniqueString({ length: 16, isPassword: true }); // "nC4t@h5Ld^3o9Kv1"
 */
export function uniqueString({
  length = 10,
  isPassword = false,
}: UniqueStringParams = {}): string {
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

type FormatCurrencyParams = {
  amount: number;
  currency?: string;
};

/**
 * Formats a given number as a currency string.
 *
 * The function takes an amount and an optional currency symbol.
 * It returns the amount formatted with two decimal places and
 * a thousands separator, prefixed with the specified currency symbol.
 *
 * @example
 * formatCurrency({ amount: 1234.56, currency: "$" }) // "$1,234.56"
 *
 * @param {number} amount - The amount to format.
 * @param {string} [currency=""] - The currency symbol to prefix.
 * @returns {string} The formatted currency string.
 */
export function formatCurrency({
  amount,
  currency = "",
}: FormatCurrencyParams): string {
  if (!amount) return `${currency}0`;

  return `${currency}${amount.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

export function convertFileSize(
  sizeInBytes: number,
  decimalPlaces: number = 1
): string {
  if (sizeInBytes < 1024) {
    return `${sizeInBytes} Bytes`;
  } else if (sizeInBytes < 1024 ** 2) {
    return `${(sizeInBytes / 1024).toFixed(decimalPlaces)} KB`;
  } else if (sizeInBytes < 1024 ** 3) {
    return `${(sizeInBytes / 1024 ** 2).toFixed(decimalPlaces)} MB`;
  } else {
    return `${(sizeInBytes / 1024 ** 3).toFixed(decimalPlaces)} GB`;
  }
}
