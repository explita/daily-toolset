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
