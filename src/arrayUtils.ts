/**
 * Returns a new array with all duplicate elements removed.
 *
 * The function takes an array as an argument and returns a new array that contains
 * only unique elements from the input array. The order of elements is preserved.
 *
 * @example
 * uniqueArray([1, 2, 3, 2, 1]) // [1, 2, 3]
 *
 * @param {T[]} arr - The input array containing elements to be de-duplicated.
 * @returns {T[]} A new array containing only unique elements from the input array.
 * @throws {Error} Throws an error if the input is not an array.
 */
export function uniqueArray<T>(arr: T[]): T[] {
  if (!Array.isArray(arr)) {
    throw new Error("Expected an array as input");
  }

  return Array.from(new Set(arr));
}

type UniqueArrayByKeyParams<T> = {
  array: T[] | null | undefined;
  key: keyof T;
};
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

export function uniqueArrayByKey<T>({
  array,
  key,
}: UniqueArrayByKeyParams<T>): T[] {
  if (!Array.isArray(array) || array.length === 0) return [];

  return Array.from(new Map(array.map((item) => [item[key], item])).values());
}

type ArrayChunkParams<T> = {
  array: T[];
  size: number;
};

/**
 * Chunks an array into smaller arrays of the specified size.
 *
 * @example
 * chunk({ arr: [1, 2, 3, 4, 5], size: 2 }) // [[1, 2], [3, 4], [5]]
 */
export function chunk<T>({ array, size }: ArrayChunkParams<T>): T[][] {
  if (!Array.isArray(array)) {
    throw new Error("Expected an array as input");
  }

  if (typeof size !== "number" || size <= 0) {
    throw new Error("Size must be a positive number");
  }

  const result: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }

  return result;
}

/**
 * Flattens an array of arrays into a single array.
 *
 * @example
 * flatten([[1, 2], [3, 4]]) // [1, 2, 3, 4]
 */
export function flatten<T>(arr: any[]): T[] {
  if (!Array.isArray(arr)) {
    throw new Error("flatten expects an array as its argument");
  }

  return arr.flat(Infinity);
}

/**
 * Shuffles an array in place.
 *
 * This function takes an array as an argument and returns the same array, but
 * with its elements in a random order. The original array is modified.
 *
 * @example
 * shuffleArray([1, 2, 3])
 * // Output: [2, 3, 1] or [3, 1, 2] or [1, 3, 2], etc.
 */
export function shuffleArray<T>(array: T[]): T[] {
  return array.sort(() => Math.random() - 0.5);
}

/**
 * Groups an array of objects by the specified key.
 *
 * @example
 * const input = [
 *   { id: 1, category: 'a' },
 *   { id: 2, category: 'a' },
 *   { id: 3, category: 'b' },
 * ];
 *
 * const result = groupBy(input, 'category');
 * // result will be { a: [{ id: 1 }, { id: 2 }], b: [{ id: 3 }] }
 */
export function groupBy<T extends Record<string, any>, K extends keyof T>(
  array: T[],
  key: K
): Record<T[K], T[]> {
  return array.reduce((acc, item) => {
    const groupKey = item[key];
    if (groupKey !== undefined) {
      if (!acc[groupKey]) acc[groupKey] = [];
      acc[groupKey].push(item);
    }
    return acc;
  }, {} as Record<T[K], T[]>);
}
