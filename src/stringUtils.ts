/**
 * Capitalizes the first letter of a string
 *
 * @example
 * capitalize("hello") // "Hello"
 */

export function capitalize(str: string): string {
  return toSentenceCase(str);
}

/**
 * Converts a string to a URL slug
 *
 * @example
 * slugify("Hello World") // "hello-world"
 * slugify("CamelCaseString") // "camel-case-string"
 * slugify("") // ""
 */

export function slugify(text: string): string {
  return toKebabCase(text);
}

/**
 * Converts a string to kebab-case
 *
 * @example
 * toKebabCase("Hello World") // "hello-world"
 * toKebabCase("CamelCaseString") // "camel-case-string"
 * toKebabCase("") // ""
 */
export function toKebabCase(str: string): string {
  if (!str) {
    return "";
  }

  return (
    str.match(
      /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g
    ) || []
  )
    .map((x: string) => x.toLowerCase())
    .join("-");
}

/**
 * Converts a string to camelCase.
 *
 * @example
 * toCamelCase("Hello World") // "helloWorld"
 * toCamelCase("kebab-case-string") // "kebabCaseString"
 * toCamelCase("") // ""
 *
 * @param str The string to convert to camelCase.
 * @returns The camelCase version of the input string.
 */
export function toCamelCase(str: string): string {
  if (!str) {
    return "";
  }

  // Use regex to split string into meaningful parts
  const parts =
    str.match(
      /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g
    ) || [];

  // Convert parts to Title Case, then join
  const titleCased = parts
    .map((x) => x.slice(0, 1).toUpperCase() + x.slice(1).toLowerCase())
    .join("");

  // Ensure first letter is lowercase for camelCase
  return titleCased.slice(0, 1).toLowerCase() + titleCased.slice(1);
}

/**
 * Converts a string to Title Case.
 *
 * @example
 * toTitleCase("Hello World") // "Hello World"
 * toTitleCase("kebab-case-string") // "Kebab Case String"
 * toTitleCase("") // ""
 *
 * @param str The string to convert to Title Case.
 * @returns The Title Case version of the input string.
 */
export function toTitleCase(str: string): string {
  return (
    str.match(
      /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g
    ) || []
  )
    .map((x) => x.slice(0, 1).toUpperCase() + x.slice(1))
    .join(" ");
}

/**
 * Converts a string to Snake Case.
 *
 * @example
 * toSnakeCase("Hello World") // "hello_world"
 * toSnakeCase("CamelCaseString") // "camel_case_string"
 * toSnakeCase("") // ""
 *
 * @param str The string to convert to Snake Case.
 * @returns The Snake Case version of the input string.
 */
export function toSnakeCase(str: string): string {
  return (
    str.match(
      /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g
    ) || []
  )
    .map((x) => x.toLowerCase())
    .join("_");
}

/**
 * Converts a string to Sentence Case.
 *
 * @example
 * toSentenceCase("hello world") // "Hello world"
 * toSentenceCase("CamelCaseString") // "Camel case string"
 * toSentenceCase("") // ""
 *
 * @param str The string to convert to Sentence Case.
 * @returns The Sentence Case version of the input string.
 */
export function toSentenceCase(str: string): string {
  const s = (
    str.match(
      /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g
    ) || []
  )
    .map((x: string) => x.toLowerCase())
    .join(" ");

  return s.slice(0, 1).toUpperCase() + s.slice(1);
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
export function uniqueString(
  length: number = 10,
  { isPassword = false }: UniqueStringParams = {}
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

type FormatCurrencyParams = {
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
export function formatCurrency(
  amount: number,
  { currency = "" }: FormatCurrencyParams
): string {
  if (!amount) return `${currency}0`;

  return `${currency}${amount.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

/**
 * Converts a file size in bytes to a human-readable string format.
 *
 * This function takes a file size in bytes and converts it to the
 * most appropriate unit (Bytes, KB, MB, or GB) with a specified
 * number of decimal places.
 *
 * @param {number} sizeInBytes - The file size in bytes to be converted.
 * @param {number} [decimalPlaces=1] - The number of decimal places for the formatted size.
 * @returns {string} A string representing the file size in a human-readable format.
 *
 * @example
 * convertFileSize(1024) // "1.0 KB"
 * convertFileSize(1048576, 2) // "1.00 MB"
 */
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

/**
 * Converts RGB values to a hexadecimal color string.
 *
 * @param {number} r - The red component of the color (0-255).
 * @param {number} g - The green component of the color (0-255).
 * @param {number} b - The blue component of the color (0-255).
 * @returns {string} A string in the format `#RRGGBB` representing the color.
 */
export function rgbToHex(r: number, g: number, b: number): string {
  // Ensure the values are within the valid RGB range (0-255)
  const validate = (value: number) => Math.max(0, Math.min(255, value));

  r = validate(r);
  g = validate(g);
  b = validate(b);

  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")}`;
}

/**
 * Converts a hexadecimal color string to a RGB(A) string.
 *
 * @param {string} hex - The hexadecimal color string to convert.
 * @returns {string} A string in the format `rgb(r, g, b)` or `rgba(r, g, b, a)`
 *                    representing the color.
 *
 * @example
 * hexToRgb("#FF0000") // "rgb(255, 0, 0)"
 * hexToRgb("#FF000080") // "rgba(255, 0, 0, 0.5)"
 */
export function hexToRgb(hex: string): string {
  // Normalize the hex string (remove "#" if present and convert to uppercase)
  const normalizedHex = hex.startsWith("#") ? hex.slice(1) : hex;
  const isShortHex = normalizedHex.length === 3 || normalizedHex.length === 4;

  // Expand shorthand hex (e.g., "abc" to "aabbcc" or "abcd" to "aabbccdd")
  const fullHex = isShortHex
    ? normalizedHex
        .split("")
        .map((char) => char + char)
        .join("")
    : normalizedHex;

  // Determine if the color has an alpha channel
  const isRgba = fullHex.length === 8;

  // Parse color components
  const r = parseInt(fullHex.slice(0, 2), 16);
  const g = parseInt(fullHex.slice(2, 4), 16);
  const b = parseInt(fullHex.slice(4, 6), 16);
  const a = isRgba ? parseInt(fullHex.slice(6, 8), 16) / 255 : null;

  // Construct the RGB(A) string
  return isRgba
    ? `rgba(${r}, ${g}, ${b}, ${a?.toFixed(2)})`
    : `rgb(${r}, ${g}, ${b})`;
}

/**
 * Generates a random color string in the specified format.
 *
 * @param {string} type - The format of the color string to generate.
 *                          One of "hex", "rgb", or "rgba". Defaults to "hex".
 * @returns {string} A random color string in the specified format.
 * @throws {Error} If the `type` parameter is not one of "hex", "rgb", or "rgba".
 *
 * @example
 * randomColor("hex") // "#FF0000"
 * randomColor("rgb") // "rgb(255, 0, 0)"
 * randomColor("rgba") // "rgba(255, 0, 0, 0.5)"
 */
export function randomColor(type: "hex" | "rgb" | "rgba" = "hex"): string {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);

  if (type === "hex") {
    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`; // Ensures proper padding
  }

  if (type === "rgb") {
    return `rgb(${r}, ${g}, ${b})`;
  }

  if (type === "rgba") {
    const a = Math.random().toFixed(2); // Alpha value between 0 and 1
    return `rgba(${r}, ${g}, ${b}, ${a})`;
  }

  throw new Error("Invalid color type. Use 'hex', 'rgb', or 'rgba'.");
}

/**
 * Converts an integer to a Roman numeral string.
 *
 * @param {number} num The number to convert to a Roman numeral.
 * @returns {string} The Roman numeral string.
 *
 * @example
 * toRomanNumeral(4) // "IV"
 * toRomanNumeral(9) // "IX"
 * toRomanNumeral(2023) // "MMXXIII"
 */

export function toRomanNumeral(num: number) {
  const lookup: [string, number][] = [
    ["M", 1000],
    ["CM", 900],
    ["D", 500],
    ["CD", 400],
    ["C", 100],
    ["XC", 90],
    ["L", 50],
    ["XL", 40],
    ["X", 10],
    ["IX", 9],
    ["V", 5],
    ["IV", 4],
    ["I", 1],
  ];

  return lookup.reduce((acc, [roman, value]) => {
    // Repeat the Roman numeral as many times as it fits into the number
    const count = Math.floor(num / value);
    num %= value; // Update num to the remainder

    return acc + roman.repeat(count);
  }, "");
}
