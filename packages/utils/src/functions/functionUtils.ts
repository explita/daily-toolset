/**
 * Retries an asynchronous function a specified number of times until it succeeds
 * or the retry count is exhausted.
 *
 * @template T The type of the value that the function returns.
 * @param fn The asynchronous function to retry.
 * @param retries The number of times to retry the function. Must be a positive number.
 *                Defaults to 3 if not specified.
 * @returns A Promise that resolves with the function's return value if it succeeds,
 *          or rejects with the last error encountered if all retries fail.
 * @throws {TypeError} If the first argument is not a function.
 * @throws {RangeError} If the retries parameter is not a positive number.
 * @throws {Error} If the function does not succeed within the retry attempts.
 */
export async function retry<T>(
  fn: () => Promise<T>,
  retries: number = 3
): Promise<T> {
  if (typeof fn !== "function") {
    throw new TypeError("Expected a function as the first argument");
  }
  if (typeof retries !== "number" || retries < 1) {
    throw new RangeError("Retries must be a positive number");
  }

  let lastError: unknown;
  for (let i = 0; i < retries; i++) {
    try {
      return await fn();
    } catch (e) {
      lastError = e;
      if (i === retries - 1) {
        throw lastError;
      }
    }
  }
  throw new Error(
    "Unexpected error: function should have either succeeded or thrown the last error"
  );
}

/**
 * Creates a debounced function that delays invoking the provided function
 * until after the specified delay in milliseconds has passed since the last
 * time the debounced function was invoked.
 *
 * @template T The type of the function to debounce.
 * @param fn The function to debounce.
 * @param delay The number of milliseconds to delay.
 * @returns A debounced function that delays invoking `fn`.
 */
export function debounce<T extends (...args: any[]) => void>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timer: NodeJS.Timeout | undefined;
  return (...args: Parameters<T>) => {
    if (timer !== undefined) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      timer = undefined;
      fn(...args);
    }, delay);
  };
}

/**
 * Creates a throttled function that invokes the provided function at most once
 * every `limit` milliseconds. Subsequent calls to the throttled function will
 * be ignored until the specified time has passed.
 *
 * @param fn The function to throttle.
 * @param limit The number of milliseconds to throttle.
 * @returns A throttled function.
 */
export function throttle(fn: (...args: any[]) => void, limit: number) {
  let inThrottle = false;
  return (...args: any[]) => {
    if (!inThrottle) {
      fn(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

/**
 * Returns a Promise that resolves after the specified number of milliseconds.
 * @param ms The number of milliseconds to wait before resolving the Promise.
 *           Defaults to 2000 (2 seconds) if omitted.
 */
export function delay(ms: number = 2000): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
