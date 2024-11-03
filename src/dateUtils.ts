/**
 * Formats a date as a string in the format "YYYY-MM-DD"
 *
 * @param {Date} date The date to format
 * @returns {string} The formatted date string
 * @throws {TypeError} If the provided date is not a Date object
 */
export function formatDate(date: Date): string {
  if (!(date instanceof Date)) {
    throw new TypeError("Expected a Date object, but received " + typeof date);
  }

  const dateStr = date.toISOString();
  const splitStr = dateStr.split("T");
  if (splitStr.length !== 2) {
    throw new Error("Unexpected ISO string format: " + dateStr);
  }

  return splitStr[0];
}

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
