/** Removes duplicate elements from an array */
export function uniqueArray<T>(arr: T[]): T[] {
  return Array.from(new Set(arr));
}

/**
 * Returns a new array with all duplicate elements removed, based on the specified key.
 *
 * The function takes an array of objects and a key as arguments. It returns a new array that contains
 * only one instance of each object, based on the specified key. If the key is not found in the object,
 * the object is skipped.
 *
 * @example
 * const array = [
 *   { id: 1, name: 'John' },
 *   { id: 2, name: 'Jane' },
 *   { id: 1, name: 'John' },
 * ];

 * const result = uniqueArrayByKey(array, 'id');

 * console.log(result);
 * // Output: [{ id: 1, name: 'John' }, { id: 2, name: 'Jane' }]
 */

export function uniqueArrayByKey<T>(array: T[], key: keyof T): T[] {
  if (!Array.isArray(array) || array.length === 0) return [];

  return Array.from(new Map(array.map((item) => [item[key], item])).values());
}

/** Divides an array into chunks of specified size */
export function chunk<T>(arr: T[], size: number): T[][] {
  const result: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
}

/** Flattens a nested array structure */
export function flatten<T>(arr: any[]): T[] {
  return arr.flat(Infinity);
}
