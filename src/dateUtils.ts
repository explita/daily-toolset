type FormatDateParams = {
  date: Date;
  format?: string;
};

/**
 * Formats a `Date` object into a readable date string according to the given format.
 *
 * The following formats are supported:
 *
 * - `YYYY-MM-DD` (default)
 * - `DD-MM-YYYY`
 * - `MM-DD-YYYY`
 * - `YYYY/MM/DD`
 * - `DD/MM/YYYY`
 * - `Month DD, YYYY`
 * - `DD Month YYYY`
 *
 * @param {Date} date The `Date` object to format.
 * @param {string} [format="YYYY-MM-DD"] The format string to use.
 * @returns {string} A `string` representing the formatted date.
 * @throws {TypeError} If the `date` parameter is not a `Date` object.
 * @throws {Error} If the `format` parameter is not a supported format string.
 */

export function formatDate({
  date,
  format = "YYYY-MM-DD",
}: FormatDateParams): string {
  if (!(date instanceof Date)) {
    throw new TypeError("Expected a Date object, but received " + typeof date);
  }

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate());
  const paddedDay = String(date.getDate()).padStart(2, "0");

  // Array of month names for easy lookup
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const monthName = monthNames[date.getMonth()];

  switch (format) {
    case "YYYY-MM-DD":
      return `${year}-${month}-${paddedDay}`;
    case "DD-MM-YYYY":
      return `${paddedDay}-${month}-${year}`;
    case "MM-DD-YYYY":
      return `${month}-${paddedDay}-${year}`;
    case "YYYY/MM/DD":
      return `${year}/${month}/${paddedDay}`;
    case "DD/MM/YYYY":
      return `${paddedDay}/${month}/${year}`;
    case "Month DD, YYYY":
      return `${monthName} ${day}, ${year}`;
    case "DD Month YYYY":
      return `${day} ${monthName} ${year}`;
    default:
      throw new Error("Unsupported format: " + format);
  }
}

/**
 * Returns a human-readable string representing the time elapsed since the given date.
 *
 * This function takes a date and calculates the time difference between the current
 * time and the given date. It returns a string representing the time elapsed in a
 * human-readable format such as "a few seconds ago", "1 minute ago", or "2 hours ago".
 * If the difference is in days, weeks, months, or years, it returns the corresponding
 * string format.
 *
 * @param {Date | null | undefined} date - The date to calculate the time elapsed from.
 * @returns {string} - A human-readable string representing the time elapsed since the given date.
 * @throws {Error} - Throws an error if the date is null, undefined, or in the future.
 */
export function timeAgo(date: Date | null | undefined): string {
  if (date === null || date === undefined) {
    throw new Error("date is null or undefined");
  }

  const diff = Date.now() - date.getTime();
  const seconds = Math.floor(diff / 1000);

  if (seconds < 0) {
    throw new Error("date is in the future");
  }

  if (seconds < 60) return `a few seconds ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60)
    return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days} ${days === 1 ? "day" : "days"} ago`;
  const weeks = Math.floor(days / 7);
  if (weeks < 4) return `${weeks} ${weeks === 1 ? "week" : "weeks"} ago`;
  const months = Math.floor(days / 30); // approximate month
  if (months < 12) return `${months} ${months === 1 ? "month" : "months"} ago`;
  const years = Math.floor(days / 365); // approximate year
  return `${years} ${years === 1 ? "year" : "years"} ago`;
}
