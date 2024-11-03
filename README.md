## Daily Toolkit

Daily Toolkit is a versatile utility library that provides helpful functions for everyday JavaScript/TypeScript needs. Designed to streamline daily coding tasks, these utilities cover string manipulation, object transformation, chunk splitting, unique string generation, and more.

**Installation**
Install the package via npm:

    npm install daily-toolkit

**Quick Examples**

    import { chunkSplit, uniqueString, transformObject } from "daily-toolkit";

    // Split a number into groups
    console.log(chunkSplit({ data: 123456789, groupSize: 3, separator: "," })); // "123,456,789"

    // Generate a random password string
    console.log(uniqueString({ length: 12, isPassword: true })); // e.g., "A7*b8s@5Kd3!"

    // Transform a flattened object to nested
    console.log(transformObject({ "a.b.c": "value" })); // { a: { b: { c: "value" } } }

**Functions**
`chunkSplit`
Splits a number or string into chunks of a specified size, separated by a specified string.

> chunkSplit({ data: number | string, groupSize?: number = 3, separator?: string = " " }): string

- **data**: The number or string to split.
- **groupSize**: The size of each chunk (default: `3`).
- **separator**: The string to use between chunks (default: `" "`).

_Example:_

    chunkSplit({ data: 123456789, groupSize: 3, separator: "," }); // "123,456,789"

<br/>

`uniqueString`
Generates a unique string of specified length with optional special characters.

> uniqueString({ length?: number = 10, isPassword?: boolean = false }): string

- **length**: Desired length of the unique string (default: `10`).
- **isPassword**: If true, includes special characters for passwords (default: `false`).

_Example:_

    uniqueString({ length: 16, isPassword: true }); // "nC4t@h5Ld^3o9Kv1"

<br/>

`transformObject`
Transforms an object with flattened key strings (e.g., `{"a.b": 1}`) into a nested object.

> transformObject(obj: { [key: string]: string | number }): { [key: string]: string }

**obj**: An object with flattened keys to be transformed.

_Example:_

    transformObject({ "a.b.c": "hello", "a.b.d": 42 });
    // { a: { b: { c: "hello", d: 42 } } }

<br/>

`addOrdinal`
Adds an ordinal suffix to a given number (e.g., `1` becomes `1st`, `2` becomes `2nd`).

> addOrdinal(num: number): string

**num**: The number to format with an ordinal suffix.

_Example:_

    addOrdinal(23); // "23rd"

<br/>

`retry`
Retries an async function a specified number of times.

> retry(fn: () => Promise<T>, retries?: number = 3): Promise<T>

- **fn**: The function to retry.
- **retries**: The number of retry attempts (default: `3`).

_Example:_

    const result = await retry(() => fetch("https://example.com"), 5);

## Contributing

Contributions are welcome! Please follow these steps:

1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature-branch`).
3.  Commit your changes (`git commit -am 'Add new feature'`).
4.  Push to the branch (`git push origin feature-branch`).
5.  Open a Pull Request.
