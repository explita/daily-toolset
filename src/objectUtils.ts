export type InputObject = { [key: string]: string | number };
export type TransformedObject = { [key: string]: string };

/**
 * Transforms an object with flattened key strings into a nested object.
 *
 * The method takes an object with key strings that can be in the format of
 * "a.b.c", where "a" is the top-level key, "b" is the second level key, and
 * "c" is the third level key. The method returns a new object with the same
 * values, but where each key is replaced with a nested object.
 *
 * If the last part of the key string is numeric, the method will treat it as
 * an array index. Otherwise, it will treat it as an object property.
 *
 * @param {Object} obj
 * @returns {Object}
 */
export function transformObject(obj: InputObject): TransformedObject {
  const result: TransformedObject = {};

  Object.keys(obj).forEach((key) => {
    const value = obj[key];
    const parts = key.split(".");

    let current: any = result;

    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];

      // Check if we're at the last part of the key
      if (i === parts.length - 1) {
        if (/^\d+$/.test(part)) {
          // If the last part is numeric, we want to set it in an array
          if (!Array.isArray(current)) current = [];
          current[parseInt(part, 10)] = value;
        } else {
          // Otherwise, set it as an object property
          current[part] = value;
        }
      } else {
        const nextPartIsNumeric = /^\d+$/.test(parts[i + 1]);

        if (!current[part]) {
          // Create an array if the next part is numeric, otherwise an object
          current[part] = nextPartIsNumeric ? [] : {};
        }

        // Traverse to the next level
        current = current[part];
      }
    }
  });

  return result;
}
