## Daily Toolset Hooks

A lightweight and flexible collection of React hooks designed to simplify everyday development. Enhance your Next.js and React projects with a powerful set of well-structured hooks for state management, performance optimization, UI interactions, and more. Perfect for building modern, efficient applications with ease.
<br/>

#### Features

- **State Management**: Simplify and optimize state handling in your React components.
- **UI Interactions**: Enhance user experience with intuitive event-driven hooks.
- **Performance Optimization**: Boost efficiency with memoization and effect management.
- **Async Handling**: Manage data fetching, debouncing, and throttling with ease.

#### Installation

Install the package via npm:

    npm install @explita/daily-toolset-hooks --save

**Quick Examples**

```javascript
import { useList } from "@explita/daily-toolset-hooks";

function ExampleComponent() {
  const [list, { append, filter, remove, prepend }] =
    useList < number > [1, 2, 3];

  return (
    <div>
      <p>List: {list.join(", ")}</p>
      <button onClick={() => append(4, 5)}>Append 4, 5</button>
      <button onClick={() => prepend(0)}>Prepend 0</button>
      <button onClick={() => filter((item) => item % 2 === 0)}>
        Keep Even Numbers
      </button>
      <button onClick={() => remove(0)}>Remove First Item</button>
    </div>
  );
}
```

```javascript
import { useWindowSize } from "@explita/daily-toolset-hooks";

// Example usage
function WindowSizeExample() {
  const { width, height } = useWindowSize();

  return (
    <div>
      <h1>Window Size</h1>
      <p>Width: {width}px</p>
      <p>Height: {height}px</p>
    </div>
  );
}
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
