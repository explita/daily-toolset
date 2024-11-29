## Daily Toolset

Daily Toolset is a versatile utility library designed to simplify everyday JavaScript/TypeScript development. From string manipulation and object transformation to chunk splitting and unique string generation, Daily Toolset provides an array of powerful, reusable functions to streamline coding tasks, boost productivity, and enhance code readability.
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

    npm install daily-toolset --save

**Quick Examples**

```javascript
import { chunkSplit, uniqueString, transformObject } from "daily-toolset";

// Split a number into groups
console.log(chunkSplit(123456789, { groupSize: 3, separator: "," })); // "123,456,789"

// Generate a random password string
console.log(uniqueString({ length: 12, isPassword: true })); // e.g., "A7*b8s@5Kd3!"

// Transform a flattened object to nested
console.log(transformObject({ "a.b.c": "value" })); // { a: { b: { c: "value" } } }
```

<br />

##### Documentation

For detailed documentation, including a comprehensive list of functions and their use cases, visit the [Daily Toolset Documentation](https://daily-toolset.explita.ng){target="\_blank"}.

<br/>

### Contributing

Contributions are welcome! Please follow these steps:

1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature-branch`).
3.  Commit your changes (`git commit -am 'Add new feature'`).
4.  Push to the branch (`git push origin feature-branch`).
5.  Open a Pull Request.
