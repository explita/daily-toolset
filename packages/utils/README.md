## Daily Toolset Utils

A lightweight and versatile collection of TypeScript utility functions designed for everyday development needs. Streamline your Node.js, React, and Next.js projects with a powerful set of well-organized helpers for strings, arrays, dates, objects, and more. Perfect for building efficient, modern applications with ease.
<br/>

#### Features

- **String Manipulation**: Format and process strings with ease.
- **Object Transformation**: Effortlessly handle nested and flattened objects.
- **Chunk Splitting**: Split data into manageable chunks for better handling.
- **Unique String Generation**: Create random, secure strings for passwords or IDs.
- _And More!_
  <br />

#### Installation

Install the package via npm:

    npm install @explita/daily-toolset-utils --save

**Quick Examples**

```javascript
import {
  chunkSplit,
  uniqueString,
  transformObject,
} from "@explita/daily-toolset-utils";

// Split a number into groups
console.log(chunkSplit(123456789, { groupSize: 3, separator: "," })); // "123,456,789"

// Generate a random password string
console.log(uniqueString({ length: 12, isPassword: true })); // e.g., "A7*b8s@5Kd3!"

// Transform a flattened object to nested
console.log(transformObject({ "a.b.c": "value" })); // { a: { b: { c: "value" } } }
```

<br />

##### Documentation

For detailed documentation, including a comprehensive list of functions and their use cases, visit the [Daily Toolset Documentation](https://daily-toolset.explita.ng).

<br/>

### Contributing

Contributions are welcome! Please follow these steps:

1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature-branch`).
3.  Commit your changes (`git commit -am 'Add new feature'`).
4.  Push to the branch (`git push origin feature-branch`).
5.  Open a Pull Request.
