export type ObjectTransformInput = { [key: string]: string | number };
export type Transformed = { [key: string]: string };

/**
 * Transforms a flat object with dot-separated keys into a nested object structure.
 *
 * The function takes an object with keys that may contain dot notation to represent
 * nested structures and returns a new object with the corresponding nested structure.
 * If a key part is numeric, it will be treated as an array index.
 *
 * @param {ObjectTransformInput} obj - The input object with flat, dot-separated keys.
 * @returns {Transformed} - The transformed object with nested structure.
 *
 * @throws {Error} Throws an error if the input is not an object or if the key structure is invalid.
 *
 * @example
 * const input = {
 *   "a.b": 1,
 *   "a.c": 2,
 *   "d": 3,
 *   "e.0": 4,
 *   "e.1": 5
 * };
 * const result = transformObject(input);
 * console.log(result);
 * // Output: { a: { b: 1, c: 2 }, d: 3, e: [4, 5] }
 */
export function transformObject(obj: ObjectTransformInput): Transformed {
  if (!obj || typeof obj !== "object") {
    throw new Error("Invalid input: Expected an object");
  }

  const result: Transformed = {};

  Object.keys(obj).forEach((key) => {
    const value = obj[key];
    const parts = key.split(".");

    let current: any = result;

    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];

      if (i === parts.length - 1) {
        if (/^\d+$/.test(part)) {
          if (!Array.isArray(current)) current = [];
          current[parseInt(part, 10)] = value;
        } else {
          current[part] = value;
        }
      } else {
        const nextPartIsNumeric = /^\d+$/.test(parts[i + 1]);

        if (!current[part]) {
          current[part] = nextPartIsNumeric ? [] : {};
        }

        if (typeof current[part] !== "object" || current[part] === null) {
          throw new Error(`Invalid structure at key part: ${part}`);
        }

        current = current[part];
      }
    }
  });

  return result;
}

type PickFromObjectParams<T extends Record<string, any>, K extends keyof T> = {
  obj: T | undefined;
  keys: K[];
};

/**
 * Creates a new object containing only the specified keys from the original object.
 *
 * @template T The type of the object from which keys will be picked.
 * @template K The type of the keys to pick from the object.
 *
 * @param {PickFromObjectParams<T, K>} params - An object containing the original object and the keys to pick.
 * @param {T | undefined} params.obj - The original object from which keys will be picked.
 * @param {K[]} params.keys - An array of keys to pick from the object.
 * @returns {Pick<T, K>} A new object containing only the picked keys.
 */
export function pickFromObject<
  T extends Record<string, any>,
  K extends keyof T
>({ obj, keys }: PickFromObjectParams<T, K>): Pick<T, K> {
  if (!obj) return {} as Pick<T, K>;

  const result = {} as Pick<T, K>;
  keys.forEach((key) => {
    if (key in obj) {
      result[key] = obj[key];
    }
  });
  return result;
}

type OmitFromObjectParams<T extends Record<string, any>, K extends keyof T> = {
  obj: T | undefined;
  keys: K[];
};

/**
 * Creates a new object excluding the specified keys from the original object.
 *
 * @template T The type of the object from which keys will be omitted.
 * @template K The type of the keys to omit from the object.
 *
 * @param {OmitFromObjectParams<T, K>} params - An object containing the original object and the keys to omit.
 * @param {T | undefined} params.obj - The original object from which keys will be omitted.
 * @param {K[]} params.keys - An array of keys to omit from the object.
 * @returns {Omit<T, K>} A new object excluding the omitted keys.
 */
export function omitFromObject<
  T extends Record<string, any>,
  K extends keyof T
>({ obj, keys }: OmitFromObjectParams<T, K>): Omit<T, K> {
  if (!obj) return {} as Omit<T, K>;

  const result = { ...obj };
  keys.forEach((key) => {
    if (key in result) {
      delete result[key];
    }
  });
  return result;
}

type PrependToObjectKeyReturn<T> = {
  [P in keyof T as `${string}${string & P}`]: T[P];
};

/**
 * Creates a new object by prepending a specified string to each key of the original object.
 *
 * @param {object} obj - The original object whose keys will be modified.
 * @param {string} key - The string to prepend to each key.
 * @returns {object} A new object with modified keys.
 *
 * @example
 * const original = { name: 'Alice', age: 30 };
 * const prepended = prependToObjectKey(original, 'user_');
 * // Result: { user_name: 'Alice', user_age: 30 }
 */
export function prependToObjectKey<T extends Record<string, unknown>>(
  obj: T | null | undefined,
  key: string
): PrependToObjectKeyReturn<T> {
  if (!obj) {
    return {} as PrependToObjectKeyReturn<T>; // Return an empty object if obj is null or undefined
  }

  const result: Record<string, T[keyof T]> = {};

  Object.keys(obj).forEach((item) => {
    const newKey = `${key}${item}` as keyof PrependToObjectKeyReturn<T>;
    result[newKey] = obj[item as keyof T];
  });

  return result as PrependToObjectKeyReturn<T>;
}

type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

type DeepMergeProps<T> = { target: T; source: DeepPartial<T> };

/**
 * A TypeScript utility function to perform a deep merge of two objects, allowing for selective merging of nested properties.
 *
 * @param {object} target - The original object to merge into.
 * @param {object} source - The object containing updates. Only properties in `source` will overwrite target properties.
 * @returns {object} An object of type `T` with `target` properties overwritten by `source` properties where applicable.
 *
 * @example
 * const original = {
 *   user: {
 *     name: 'John',
 *     address: {
 *       city: 'New York',
 *       zip: '10001'
 *     }
 *   }
 * };
 *
 * const updates = {
 *   user: {
 *     address: {
 *       city: 'San Francisco'
 *     }
 *   }
 * };
 *
 * const merged = deepMerge({ target: original, source: updates });
 * console.log(merged);
 * /*
 * {
 *   user: {
 *     name: 'John',
 *     address: {
 *       city: 'San Francisco',
 *       zip: '10001'
 *     }
 *   }
 * }
 */
export function deepMerge<T extends object>({
  target,
  source,
}: DeepMergeProps<T>): T {
  const output = { ...target };

  for (const key in source) {
    const targetValue = target[key];
    const sourceValue = source[key];

    if (isObject(targetValue) && isObject(sourceValue)) {
      // Recursively merge objects
      output[key as keyof T] = deepMerge({
        target: targetValue as object,
        source: sourceValue as object,
      }) as T[keyof T];
    } else if (sourceValue !== undefined) {
      output[key as keyof T] = sourceValue as T[keyof T];
    }
  }

  return output;
}

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}
