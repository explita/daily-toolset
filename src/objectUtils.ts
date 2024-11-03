export type InputObject = { [key: string]: string | number };
export type TransformedObject = { [key: string]: string };

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
