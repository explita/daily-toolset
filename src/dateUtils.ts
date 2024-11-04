type FormatDateParams = {
  date: Date;
  format?:
    | "YYYY-MM-DD"
    | "DD-MM-YYYY"
    | "MM-DD-YYYY"
    | "YYYY/MM/DD"
    | "DD/MM/YYYY"
    | "Month DD, YYYY"
    | "DD Month YYYY";
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
type FormatTimeParams = {
  date: Date;
  format?: "HH:mm:ss" | "HH:mm" | "hh:mmA" | "hh:mm:ssA" | "HH:mm:ss.SSS";
};

/**
 * Formats a `Date` object into a readable time string according to the given format.
 *
 * The following formats are supported:
 *
 * - `HH:mm:ss` (24-hour format with seconds)
 * - `HH:mm` (24-hour format without seconds)
 * - `hh:mmA` (12-hour format with AM/PM)
 * - `hh:mm:ssA` (12-hour format with seconds and AM/PM)
 * - `HH:mm:ss.SSS` (24-hour format with milliseconds)
 *
 * If an unsupported format string is provided, an error will be thrown with a message indicating the unsupported format.
 *
 * @param {Date} date The `Date` object to format.
 * @param {string} [format="hh:mmA"] The format string to use.
 * @returns {string} A `string` representing the formatted time.
 * @throws {TypeError} If the `date` parameter is not a `Date` object.
 * @throws {Error} If the `format` parameter is not a supported format string.
 */
export function formatTime({
  date,
  format = "hh:mmA",
}: FormatTimeParams): string {
  if (!(date instanceof Date)) {
    throw new TypeError("Expected a Date object, but received " + typeof date);
  }

  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  const period = Number(hours) < 12 ? "AM" : "PM";

  switch (format) {
    case "HH:mm:ss":
      return `${hours}:${minutes}:${seconds}`;
    case "HH:mm":
      return `${hours}:${minutes}`;
    case "hh:mmA":
      const hours12 =
        hours === "00" ? "12" : String(Number(hours) % 12).padStart(2, "0");
      return `${hours12}:${minutes}${period}`;
    case "hh:mm:ssA":
      const hours12Full =
        hours === "00" ? "12" : String(Number(hours) % 12).padStart(2, "0");
      return `${hours12Full}:${minutes}:${seconds}${period}`;
    case "HH:mm:ss.SSS":
      const milliseconds = String(date.getMilliseconds()).padStart(3, "0");
      return `${hours}:${minutes}:${seconds}.${milliseconds}`;
    default:
      throw new Error("Unsupported format: " + format);
  }
}

type FormatDateAndTimeParams = {
  date: Date;
  dateFormat?: FormatDateParams["format"];
  timeFormat?: FormatTimeParams["format"];
  seperator?: string;
};

/**
 * Formats a `Date` object into a string combining both date and time according to specified formats.
 *
 * This function allows customization of the date and time formats and returns a single string
 * that includes both, separated by a specified separator.
 *
 * @param {Date} date - The `Date` object to format.
 * @param {string} [dateFormat="YYYY-MM-DD"] - The format string for the date portion.
 * @param {string} [timeFormat="hh:mmA"] - The format string for the time portion.
 * @param {string} [seperator=" "] - The separator to use between the formatted date and time.
 * @returns {string} A `string` representing the formatted date and time.
 * @throws {TypeError} If the `date` parameter is not a `Date` object.
 */
export function formatDateTime({
  date,
  dateFormat = "YYYY-MM-DD",
  timeFormat = "hh:mmA",
  seperator = " ",
}: FormatDateAndTimeParams): string {
  if (!(date instanceof Date)) {
    throw new TypeError("Expected a Date object, but received " + typeof date);
  }

  const formattedDate = formatDate({ date, format: dateFormat });
  const formattedTime = formatTime({ date, format: timeFormat });

  return `${formattedDate}${seperator}${formattedTime}`;
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
