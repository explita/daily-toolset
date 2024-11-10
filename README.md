## Daily Toolset

Daily Toolset is a versatile utility library that provides helpful functions for everyday JavaScript/TypeScript needs. Designed to streamline daily coding tasks, these utilities cover string manipulation, object transformation, chunk splitting, unique string generation, and more.

With **Daily Toolset**, you’ll have access to powerful utilities for handling everyday coding tasks, improving productivity and code readability. Simply install and start leveraging functions designed to simplify and standardize JavaScript/TypeScript operations.
<br/>

#### Installation

Install the package via npm:

    npm install daily-toolset

**Quick Examples**

    import { chunkSplit, uniqueString, transformObject } from "daily-toolset";

    // Split a number into groups
    console.log(chunkSplit(123456789, { groupSize: 3, separator: "," })); // "123,456,789"

    // Generate a random password string
    console.log(uniqueString({ length: 12, isPassword: true })); // e.g., "A7*b8s@5Kd3!"

    // Transform a flattened object to nested
    console.log(transformObject({ "a.b.c": "value" })); // { a: { b: { c: "value" } } }

### Functions

- [chunkSplit](#chunksplit)
- [uniqueString](#uniquestring)
- [capitalize](#capitalize)
- [slugify](#slugify)
- [camelToTitle](#cameltotitle)
- [parseQueryString](#parsequerystring)
- [buildQueryString](#buildquerystring)
- [formatCurrency](#formatcurrency)
- [addOrdinal](#addordinal)
- [convertFileSize](#convertfilesize)
- [transformObject](#transformobject)
- [pickFromObject](#pickfromobject)
- [omitFromObject](#omitfromobject)
- [prependToObjectKey](#prependtoobjectkey)
- [deepMerge](#deepmerge)
- [isEmpty](#isempty)
- [isValidEmail](#isvalidemail)
- [isValidPhone](#isvalidphone)
- [isNumeric](#isnumeric)
- [randomNumber](#randomnumber)
- [numberPercentage](#numberpercentage)
- [retry](#retry)
- [debounce](#debounce)
- [throttle](#throttle)
- [delay](#delay)
- [formatDate](#formatdate)
- [formatTime](#formattime)
- [formatDateTime](#formatdatetime)
- [timeAgo](#timeago)
- [uniqueArray](#uniquearray)
- [uniqueArrayByKey](#uniquearraybykey)
- [flatten](#flatten)
- [shuffleArray](#shufflearray)

<br/>

#### `chunkSplit`

Splits a number or string into chunks of a specified size, separated by a specified string.

> chunkSplit(number | string, { groupSize?: number = 3, separator?: string = " " }): string

- **Parameters**:
  - **data**: The number or string to split.
  - **groupSize**: The size of each chunk (default: `3`).
  - **separator**: The string to use between chunks (default: `" "`).
- **Returns**: The result of the splited string.

_Example:_

    import { chunkSplit } from "daily-toolset";

    chunkSplit(123456789, { groupSize: 3, separator: "," }); // "123,456,789"

<br/>

#### `uniqueString`

Generates a unique string of specified length with optional special characters.

> uniqueString({ length?: number = 10, isPassword?: boolean = false }): string

- **Parameters**:
  - **length**: Desired length of the unique string (default: `10`).
  - **isPassword**: If true, includes special characters for passwords (default: `false`).
- **Returns**: The generated .

_Example:_

    import { uniqueString } from "daily-toolset";

    uniqueString({ length: 16, isPassword: true }); // "nC4t@h5Ld^3o9Kv1"

<br/>

#### `capitalize`

Capitalizes the first letter of the given string.

> capitalize(str: string): string

- **Parameters**:
  - `str`: The string to capitalize.
- **Returns**: The string with the first letter capitalized.

_Example:_

    import { capitalize } from "daily-toolset";

    capitalize("hello world"); // "Hello world"

<br/>

#### `slugify`

Converts a string into a URL-friendly "slug" by lowercasing it, removing special characters, and replacing spaces with hyphens.

> slugify(text: string): string

- **Parameters**:
  - `text`: The text to convert into a slug.
- **Returns**: The "slugified" string.

_Example:_

    import { slugify } from "daily-toolset";

    slugify("Hello World! How are you?"); // "hello-world-how-are-you"

<br/>

#### `camelToTitle`

Converts a camelCase string into a Title Case string, adding spaces between words.

> camelToTitle(str: string): string

- **Parameters**:
  - `str`: The camelCase string to convert.
- **Returns**: The string in Title Case.

_Example:_

    import { camelToTitle } from "daily-toolset";

    camelToTitle("camelCaseToTitleCase"); // "Camel Case To Title Case"

<br/>

#### `parseQueryString`

Parses the query string of a URL into a JavaScript object.

> parseQueryString(url: string): Record<string, string>

- **Parameters**:
  - `url`: The URL with a query string to parse.
- **Returns**: An object with key-value pairs representing the query parameters.

_Example:_

    import { parseQueryString } from "daily-toolset";

    parseQueryString("https://example.com?page=2&sort=desc"); // { page: "2", sort: "desc" }

<br/>

#### `buildQueryString`

Creates a query string from an object or other formats supported by `URLSearchParams`

> buildQueryString(params: string | Record<string, string> | string[][] | URLSearchParams | undefined): string

- **Parameters**:
  - `params`: An object, array, or `URLSearchParams` representing the query parameters.
- **Returns**: A query string that can be appended to a URL.

_Example:_

    import { buildQueryString } from "daily-toolset";

    buildQueryString({ page: "2", sort: "desc" }); // "page=2&sort=desc"

<br/>

#### `formatCurrency`

Formats a number as a currency string, adding a currency symbol if specified.

> formatCurrency({ amount, currency = "" }: FormatCurrencyParams): string

- **Parameters**:
  - `amount`: The amount to format.
  - `currency`: An optional currency symbol to prepend.
- **Returns**: The formatted currency string.

_Example:_

    import { formatCurrency } from "daily-toolset";

    formatCurrency({ amount: 1234.56, currency: "$" }); // "$1,234.56"

<br/>

#### `addOrdinal`

Adds an ordinal suffix to a given number (e.g., `1` becomes `1st`, `2` becomes `2nd`).

> addOrdinal(num: number): string

- **Parameters**:
  - `num`: The number to format with an ordinal suffix.
- **Returns**: The transformed string with ordinal surfix.

_Example:_

    import { addOrdinal } from "daily-toolset";

    addOrdinal(23); // "23rd"

<br/>

#### `convertFileSize`

A utility function to convert file sizes from bytes to a human-readable format (KB, MB, GB).

> convertFileSize(sizeInBytes: number, decimalPlaces: number = 1): string

- **Parameters**:

  - `sizeInBytes`: The size in bytes to be converted.

  - `decimalPlaces`: The number of decimal places to include in the converted size, default: 1. Useful for displaying a rounded value.

- **Returns**: A string that represents the file size in the appropriate unit (Bytes, KB, MB, GB).

_Example:_

    import { convertFileSize } from "daily-toolset";

    console.log(convertFileSize(500));            // "500 Bytes"
    console.log(convertFileSize(2048));           // "2.0 KB"
    console.log(convertFileSize(1048576));        // "1.0 MB"
    console.log(convertFileSize(1073741824, 2));  // "1.00 GB"

<br/>

#### `transformObject`

Transforms an object with flattened key strings (e.g., `{"a.b": 1}`) into a nested object.

> transformObject(obj: { [key: string]: string | number }): { [key: string]: string }

- **Parameters**:
  - `obj`: An object with flattened keys to be transformed.
- **Returns**: The transformed object.

_Example:_

    import { transformObject } from "daily-toolset";

    transformObject({ "a.b.c": "hello", "a.b.d": 42 });
    // { a: { b: { c: "hello", d: 42 } } }

<br/>

#### `pickFromObject`

Creates a new object containing only the specified keys from the original object.

> pickFromObject<T, K>(params: PickFromObjectParams<T, K>): Pick<T, K>

- **Parameters**:
  - `obj` (T | undefined): The original object from which keys will be picked.
  - `keys` (K[]): An array of keys to pick from the object.
- **Returns**: A new object containing only the picked keys.

_Example:_

    import { pickFromObject } from "daily-toolset";

    const original = { a: 1, b: 2, c: 3 };
    const picked = pickFromObject({ obj: original, keys: ['a', 'c'] });
    // Result: { a: 1, c: 3 }

<br/>

#### `omitFromObject`

Creates a new object that excludes the specified keys from the original object.

> omitFromObject<T, K>(params: OmitFromObjectParams<T, K>): Omit<T, K>

- **Parameters**:
  - `obj` (T | undefined): The original object from which keys will be omitted.
  - `keys` (K[]): An array of keys to omit from the object.
- **Returns**: A new object excluding the omitted keys.

_Example:_

    import { omitFromObject } from "daily-toolset";

    const original = { a: 1, b: 2, c: 3 };
    const omitted = omitFromObject({ obj: original, keys: ['b'] });
    // Result: { a: 1, c: 3 }

<br/>

#### `prependToObjectKey`

Creates a new object by prepending a specified string to each key of the original object.

> prependToObjectKey<T>(obj: T | null | undefined, key: string): PrependToObjectKeyReturn<T>

- **Parameters**:
  - (T | null | undefined): The original object whose keys will be modified.
  - `key` (string): The string to prepend to each key.
- **Returns**: A new object with modified keys.

_Example:_

    import { omitFromObject } from "daily-toolset";

    const original = { name: 'Alice', age: 30 };
    const prepended = prependToObjectKey(original, 'user_');
    // Result: { user_name: 'Alice', user_age: 30 }

<br/>

#### `deepMerge`

A TypeScript utility function to perform a deep merge of two objects, allowing for selective merging of nested properties.

> deepMerge<T extends object>({ target, source }: DeepMergeProps<T>): T

- **Parameters**:
  - `target`: The original object to merge into. This is the base object in the merge operation.
  - `source`: The object containing updates. Only properties in `source` will overwrite target properties.
- **Returns**: An object of type `T` with `target` properties overwritten by `source` properties where applicable.

_Example:_

    import { deepMerge } from "daily-toolset";

    const original = {
      user: {
        name: 'John',
        address: {
          city: 'New York',
          zip: '10001'
        }
      }
    };

    const updates = {
      user: {
        address: {
          city: 'San Francisco'
        }
      }
    };

    const merged = deepMerge({ target: original, source: updates });
    console.log(merged);
    /*
    {
      user: {
        name: 'John',
        address: {
          city: 'San Francisco',
          zip: '10001'
        }
      }
    }
    */

<br/>

#### `isEmpty`

Checks if a value is empty. Returns `true` for `null`, `undefined`, empty arrays, empty objects, or empty strings.

> isEmpty(value: unknown): boolean

- **Parameters**:
  - `value`: The value to check.
- **Returns**: `true` if the value is considered empty, `false` otherwise.

_Example:_

    import { isEmpty } from "daily-toolset";

    isEmpty(""); // true
    isEmpty([]); // true
    isEmpty({}); // true
    isEmpty("Hello world"); // false

<br/>

#### `isValidEmail`

Validates if the provided string is a properly formatted email address.

> isValidEmail(email: string): boolean

- **Parameters**:
  - `email`: The email address string to validate.
- **Returns**: `true` if the email is valid, `false` otherwise.

_Example:_

    import { isValidEmail } from "daily-toolset";

    isValidEmail("user@example.com"); // true
    isValidEmail("invalid-email");    // false

<br/>

#### `isValidPhone`

Validates if the provided string is a properly formatted phone number. This function checks if the string contains only digits and possibly spaces, dashes, or parentheses, depending on the desired format.

> isValidPhone(phone: string): boolean

- **Parameters**:
  - `phone`: The phone number string to validate.
- **Returns**: `true` if the phone number is valid, `false` otherwise.

_Example:_

    import { isValidPhone } from "daily-toolset";

    isValidPhone("(123) 456-7890"); // true
    isValidPhone("123456");         // false

<br/>

#### `isNumeric`

Checks if the provided value is a numeric value (either a number type or a string that can be converted to a number).

> isNumeric(num: number): boolean

- **Parameters**:
  - `num`: The value to check.
- **Returns**: `true` if the value is numeric, `false` otherwise.

_Example:_

    import { isNumeric } from "daily-toolset";

    isNumeric(123);       // true
    isNumeric("456");     // true
    isNumeric("abc");     // false
    isNumeric(undefined); // false

<br/>

#### `randomNumber`

Generates a random number with a specified number of digits. By default, it generates an 8-digit random number.

> randomNumber(length: number = 8): number

- **Parameters**:
  - `length` _(optional)_: The number of digits for the generated random number. Default is `8`.
- **Returns**: A random number with the specified length.

_Example:_

    import { randomNumber } from "daily-toolset";

    randomNumber(); // e.g., 12345678
    randomNumber(5); // e.g., 56789

<br/>

#### `numberPercentage`

Calculates the percentage of `calculateFrom` relative to `total`. The result is rounded to two decimal places.

> numberPercentage(total: number, calculateFrom: number): number

- **Parameters**:
  - `total`: The total number (denominator) for calculating the percentage.
  - `calculateFrom`: The number (numerator) from which the percentage is calculated.
- **Returns**: The percentage value as a number.

_Example:_

    import { numberPercentage } from "daily-toolset";

    numberPercentage(200, 50);   // 25
    numberPercentage(500, 125);  // 25
    numberPercentage(0, 50);     // Returns 0 (if total is 0)

<br/>

#### `retry`

Executes an asynchronous function and retries it if it fails. This function is particularly useful for handling network requests or other potentially unreliable operations.

> retry<T>(fn: () => Promise<T>, retries: number = 3): Promise<T>

- **Parameters**:
  - `fn`: The asynchronous function to execute.
  - `retries` _(optional)_: The number of retry attempts if `fn` fails. Default is `3`.
- **Returns**: A `Promise` that resolves with the result of `fn` or rejects if all retries fail.

_Example:_

    import { retry } from "daily-toolset";

    async function fetchData() {
        // Some asynchronous operation, e.g., API 		request
    }
    retry(fetchData, 3).then((result) => console.log(result)).catch(console.error);

<br/>

#### `debounce`

Creates a debounced function that delays invoking `fn` until after `delay` milliseconds have passed since the last time it was called. This is useful for limiting the rate of function calls in response to events like resizing or typing.

> debounce<T extends (...args: any[]) => void>(fn: T, delay: number): ((...args: Parameters<T>) => void)

- **Parameters**:
  - `fn`: The function to debounce.
  - `delay`: The number of milliseconds to delay.
- **Returns**: A debounced version of the original function.

_Example:_

    import { debounce } from "daily-toolset";

    function onResize() {
      console.log("Window resized");
    }

    const debouncedResize = debounce(onResize, 300);
    window.addEventListener("resize", debouncedResize);

<br/>

#### `throttle`

Creates a throttled function that only invokes `fn` at most once per `limit` milliseconds. Useful for reducing the number of times a function is called during events that occur frequently, such as scrolling.

> throttle(fn: (...args: any[]) => void, limit: number)

- **Parameters**:
  - `fn`: The function to throttle.
  - `limit`: The minimum time interval (in milliseconds) between calls.
- **Returns**: A throttled version of the original function.

_Example:_

    import { throttle } from "daily-toolset";

    function onScroll() {
      console.log("Scrolled!");
    }

    const throttledScroll = throttle(onScroll, 200);
    window.addEventListener("scroll", throttledScroll);

<br/>

#### `delay`

Pauses asynchronous code for a given number of milliseconds, often useful for delaying actions within an async function.

> delay(ms: number = 2000): Promise<void>

- **Parameters**:
  - `ms`: The number of milliseconds to wait.
- **Returns**: A Promise that resolves after the specified time.

_Example:_

    import { delay } from "daily-toolset";

    async function delayedTask() {
      console.log("Starting task...");
      await delay(1000);
      console.log("Task finished after delay");
    }

    delayedTask();

<br/>

#### `formatDate`

The `formatDate` function formats a JavaScript `Date` object into various string formats for different date representations.

> formatDate(date:Date, { format = "DD/MM/YYYY"}: FormatDateParams): string

- **Parameters**:
  - `date` (required): A `Date` object. If the argument passed is not a valid `Date`, a `TypeError` will be thrown.
  - `format` (optional): A string specifying the desired output format. Defaults to `"DD/MM/YYYY"`.
- **Returns**: A `string` representing the formatted date.

**Supported Formats**
| Format | Example Output |
|-------------------|---------------------|
| `YYYY-MM-DD` | `2024-01-01` |
| `DD-MM-YYYY` | `01-01-2024` |
| `MM-DD-YYYY` | `01-01-2024` |
| `YYYY/MM/DD` | `2024/01/01` |
| `DD/MM/YYYY` | `01/01/2024` |
| `Month DD, YYYY` | `January 1, 2024` |
| `DD Month YYYY` | `1 January 2024` |

If an unsupported format string is provided, an error will be thrown with a message indicating the unsupported format.

_Example:_

    import { formatDate } from "daily-toolset";

    const date = new Date("2024-01-01");

    // Using default format
    console.log(formatDate(date)); // "01/01/2024"

    // Using various supported formats
    console.log(formatDate(date, { format:"YYYY-MM-DD"})); // "2024-01-01"
    console.log(formatDate(date, { format:"DD-MM-YYYY"})); // "01-01-2024"
    console.log(formatDate(date, { format:"MM-DD-YYYY"})); // "01-01-2024"
    console.log(formatDate(date, { format:"YYYY/MM/DD"})); // "2024/01/01"
    console.log(formatDate(date, { format:"DD/MM/YYYY"})); // "01/01/2024"
    console.log(formatDate(date, { format:"Month DD, YYYY"})); // "January 1, 2024"
    console.log(formatDate(date, { format:"DD Month YYYY"})); // "1 January 2024"

<br/>

#### `formatTime`

A utility function to format JavaScript `Date` objects into various time formats. This function provides several time formats and allows for 24-hour or 12-hour (AM/PM) representations.

> function formatTime({ date: Date, format?: string }): string

- **Parameters**:
  - `date` (required): A JavaScript Date object to format.
  - `format` (optional): A string specifying the time format. Default is "hh:mmA".
- **Returns**: A string representing the formatted time.

**Supported Formats**
| Format | Description | Example Output |
|-----------------|-------------------------------------------|-------------------|
| `HH:mm:ss` | 24-hour format with seconds | `14:30:15` |
| `HH:mm` | 24-hour format without seconds | `14:30` |
| `hh:mmA` | 12-hour format with AM/PM | `02:30PM` |
| `hh:mm:ssA` | 12-hour format with seconds and AM/PM | `02:30:15PM` |
| `HH:mm:ss.SSS` | 24-hour format with milliseconds | `14:30:15.123` |

<br/>

_Example:_

    import { formatTime } from "daily-toolset";

    const date = new Date();

    // Format time in 24-hour format with seconds
    console.log(formatTime(date, { format: "HH:mm:ss" })); // Example: "14:30:15"

    // Format time in 12-hour format with AM/PM
    console.log(formatTime(date, { format: "hh:mmA" })); // Example: "02:30PM"

    // Format time in 24-hour format without seconds
    console.log(formatTime(date, { format: "HH:mm" })); // Example: "14:30"

    // Format time in 12-hour format with seconds and AM/PM
    console.log(formatTime(date, { format: "hh:mm:ssA" })); // Example: "02:30:15PM"

    // Format time in 24-hour format with milliseconds
    console.log(formatTime(date, { format: "HH:mm:ss.SSS" })); // Example: "14:30:15.123"

<br/>

#### `formatDateTime`

The formatDateTime function formats a JavaScript Date object into a combined date and time string, using customizable date and time formats with a specified separator.

> function formatDateTime(date, {
> dateFormat = "YYYY-MM-DD",
> timeFormat = "hh:mmA",
> seperator = " | ",
> }: FormatDateAndTimeParams): string

- **Parameters**:
  - `date` (required): The Date object to format.
  - `dateFormat` (optional): A string specifying the date format. Defaults to `"YYYY-MM-DD"`.
  - `timeFormat` (optional): A string specifying the time format. Defaults to `"hh:mmA"`.
  - `separator` (optional): A string used to separate the date and time portions. Defaults to a space `(" | ")`.
- **Returns**: A string representing the formatted time.

**Supported Date Formats**
Refer to `formatDate` for supported date formats:

- `"YYYY-MM-DD"` → `2023-10-25`
- `"DD-MM-YYYY"` → `25-10-2023`
- `"MM-DD-YYYY"` → `10-25-2023`
- `"YYYY/MM/DD"` → `2023/10/25`
- `"DD/MM/YYYY"` → `25/10/2023`
- `"Month DD, YYYY"` → `October 25, 2023`
- `"DD Month YYYY"` → `25 October 2023`

**Supported Time Formats**
Refer to `formatTime` for supported time formats:

- `"HH:mm:ss"` → `14:30:15`
- `"HH:mm"` → `14:30`
- `"hh:mmA"` → `02:30PM`
- `"hh:mm:ssA"` → `02:30:15PM`
- `"HH:mm:ss.SSS"` → `14:30:15.123`

<br/>

_Example:_

    import { formatDateTime } from "daily-toolset";

    const date = new Date();

    const formattedDateTime = formatDateTime(date, {
      dateFormat: "DD Month YYYY",
      timeFormat: "HH:mm",
      separator: " at ",
    });

    console.log(formattedDateTime); // e.g., "25 October 2023 at 14:30"

<br/>

#### `timeAgo`

Returns a relative time string (e.g., "2 hours ago") from a given date to the current time. This function is ideal for creating human-readable time differences, such as for activity feeds or notifications.

> timeAgo(date: Date | null | undefined): string

- **Parameters**:
  - `date`: A `Date` object or `null`/`undefined` (if no date is given, it returns an empty string or alternative).
- **Returns**: A `string` representing the time difference, like "5 minutes ago", "2 days ago", or an empty string if no date is provided.

_Example:_

    import { timeAgo } from "daily-toolset";

    const pastDate = new Date(Date.now() - 60000); // 1 minute ago
    console.log(timeAgo(pastDate)); // "1 minute ago"

<br/>

#### `uniqueArray`

Removes duplicate items from an array and returns an array with unique values.

> uniqueArray<T>(arr: T[]): T[]

- **Parameters**:
  - `arr`: An array of any type `T`.
- **Returns**: A new array containing only unique items from the original array.

_Example:_

    import { uniqueArray } from "daily-toolset";

    const numbers = [1, 2, 2, 3, 4, 4, 5];
    console.log(uniqueArray(numbers)); // [1, 2, 3, 4, 5]

<br/>

#### `uniqueArrayByKey`

Removes duplicate objects from an array based on a specific key and returns an array with unique objects.

> uniqueArrayByKey<T>({ array, key }: UniqueArrayByKeyParams<T>): T[]

- **Parameters**:
  - `array`: An array of objects of type `T`.
  - `key`: A `string` representing the key in each object by which uniqueness is determined.
- **Returns**: A new array containing objects with unique values based on the specified key.

_Example:_

    import { uniqueArrayByKey } from "daily-toolset";

    const people = [
      { id: 1, name: "Alice" },
      { id: 2, name: "Bob" },
      { id: 1, name: "Alice" },
    ];
    console.log(uniqueArrayByKey({ array: people, key: "id" })); // [{ id: 1, name: "Alice" }, { id: 2, name: "Bob" }]

<br/>

#### `flatten`

Flattens a nested array structure into a single-level array.

> flatten<T>(arr: any[]): T[]

- **Parameters**:
  - `arr`: An array that may contain nested arrays.
- **Returns**: A flattened array with all nested items brought to the top level.

_Example:_

    import { flatten } from "daily-toolset";

    const nestedArray = [1, [2, [3, 4]], 5];
    console.log(flatten(nestedArray)); // [1, 2, 3, 4, 5]

<br/>

#### `shuffleArray`

A simple utility function that shuffles an array randomly. The shuffleArray function works generically and can shuffle arrays of any type.

> shuffleArray<T>(array: T[]): T[]

- **Parameters**:
  - array: `T[]` - An array of any type `T` that you want to shuffle.
- **Returns**: `T[]` - A new array containing the elements of the input array, but in random order.

_Example:_

    import { shuffleArray } from "daily-toolset";

    const array = [1, 2, 3, "a", "b", "c"];
    const shuffledArray = shuffleArray(array);

    console.log(shuffledArray); // Output: A randomly ordered array, e.g., ["c", 2, "b", 1, 3, "a"]

<br/>

## Type Safety

All functions are designed with TypeScript's strong typing system to ensure type safety and prevent runtime errors. They leverage generics to maintain the integrity of the original value types while modifying them.

<br/>

## Contributing

Contributions are welcome! Please follow these steps:

1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature-branch`).
3.  Commit your changes (`git commit -am 'Add new feature'`).
4.  Push to the branch (`git push origin feature-branch`).
5.  Open a Pull Request.
