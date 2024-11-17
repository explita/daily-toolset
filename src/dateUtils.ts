type FormatDateParams = {
  format?:
    | "YYYY-MM-DD"
    | "DD-MM-YYYY"
    | "MM-DD-YYYY"
    | "YYYY/MM/DD"
    | "DD/MM/YYYY"
    | "Month DD, YYYY"
    | "DD Month YYYY"
    | "YYYY"
    | "MM"
    | "mm"
    | "M"
    | "DD"
    | "dd"
    | "D"
    | "d";
  monthFormat?: Format;
  dayFormat?: Format;
};

type Format = "short" | "long";

type FixedDate = `${string | number}-${string | number}-${string | number}`;

/**
 * Formats a given date object into a specified date format string.
 *
 * @param date The date object to format. If a string is passed, it must be a valid
 *             date in the format "YYYY-MM-DD". If null is passed, the function
 *             will format the current date.
 * @param opts An object containing options for the formatter. The following
 *             options are available:
 *              - format: The desired output format. Defaults to "DD/MM/YYYY".
 *              - monthFormat: The format for the month. Defaults to "short". Can
 *              be either "short" or "long". If "long", the full month name
 *              will be used. If "short", the abbreviated month name will be
 *              used.
 *              - dayFormat: The format for the day. Defaults to "short". Can
 *              be either "short" or "long". If "long", the full day name
 *              will be used. If "short", the abbreviated day name will be
 *              used.
 * @returns A string representing the formatted date.
 *
 * Supported formats include:
 * - "YYYY-MM-DD"
 * - "DD-MM-YYYY"
 * - "MM-DD-YYYY"
 * - "YYYY/MM/DD"
 * - "DD/MM/YYYY"
 * - "Month DD, YYYY"
 * - "DD Month YYYY"
 * - "YYYY"
 * - "MM"
 * - "mm"
 * - "M"
 * - "DD"
 * - "dd"
 * - "D"
 */
export function formatDate(
  date: Date | FixedDate | null = new Date(),
  {
    format = "DD/MM/YYYY",
    monthFormat = "short",
    dayFormat = "short",
  }: FormatDateParams = {}
): string {
  const isValidDate = (date: string): date is FixedDate => {
    const regex = /^\d{4}-\d{2}-\d{2}$/; // Matches YYYY-MM-DD format
    return regex.test(date);
  };

  if (date === null) {
    date = new Date();
  }

  if (typeof date === "string" && !isValidDate(date)) {
    throw new Error(
      `Invalid date string provided: "${date}". Expected format: YYYY-MM-DD or similar.`
    );
  }

  if (typeof date === "string" && isValidDate(date)) {
    date = new Date(date);
  }

  if (!(date instanceof Date)) {
    throw new TypeError("Expected a Date object, but received " + typeof date);
  }

  const year = date.getFullYear();
  const month = date.getMonth(); // 0-based index
  const day = date.getDate();
  const weekDay = date.getDay();

  // Zero-padded values
  const paddedMonth = String(month + 1).padStart(2, "0");
  const paddedDay = String(day).padStart(2, "0");

  // Names for months and days
  const monthNames = {
    long: [
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
    ],
    short: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
  };

  const dayNames = {
    long: [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ],
    short: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  };

  const monthName = monthNames[monthFormat]?.[month] || "";
  const dayName = dayNames[dayFormat]?.[weekDay] || "";

  // Switch for format selection
  switch (format) {
    case "YYYY-MM-DD":
      return `${year}-${paddedMonth}-${paddedDay}`;
    case "DD-MM-YYYY":
      return `${paddedDay}-${paddedMonth}-${year}`;
    case "MM-DD-YYYY":
      return `${paddedMonth}-${paddedDay}-${year}`;
    case "YYYY/MM/DD":
      return `${year}/${paddedMonth}/${paddedDay}`;
    case "DD/MM/YYYY":
      return `${paddedDay}/${paddedMonth}/${year}`;
    case "Month DD, YYYY":
      return `${monthName} ${day}, ${year}`;
    case "DD Month YYYY":
      return `${day} ${monthName} ${year}`;
    case "YYYY":
      return `${year}`;
    case "MM":
      return `${paddedMonth}`;
    case "mm":
      return `${month + 1}`;
    case "M":
      return `${monthName}`;
    case "DD":
      return `${paddedDay}`;
    case "dd":
      return `${day}`;
    case "D":
      return `${dayName}`;
    default:
      throw new Error(`Unsupported format: "${format}".`);
  }
}

/**
 * Retrieves the day of the week from a given date as a string.
 *
 * @param {Date | FixedDate | null} date - The date to retrieve the day from. Defaults to the current date.
 * @param {"short" | "long"} [format="short"] - The format of the day name to return. Defaults to "short".
 * @returns {string} The day name as a string (e.g. "Mon" or "Monday").
 */
export function getDayName(
  date: Date | FixedDate | null = new Date(),
  format: FormatDateParams["dayFormat"] = "short"
): string {
  const day = formatDate(date, { format: "D", dayFormat: format });
  return day;
}

/**
 * Retrieves the day of the month from a given date as a zero-padded two-digit string.
 *
 * @param {Date | FixedDate | null} date - The date to retrieve the day from. Defaults to the current date.
 * @returns {string} A two-digit string representing the day of the month (01-31).
 */

export function getDay(date: Date | FixedDate | null = new Date()): string {
  const day = formatDate(date, { format: "DD" });
  return day;
}

/**
 * Retrieves the month from a given date as a formatted string.
 *
 * @example
 * const result = getMonthName();
 * console.log(result);
 * // Output: "Jan" (or the current month)
 *
 * const result = getMonthName(new Date(), "long");
 * console.log(result);
 * // Output: "August" (or the current month)
 *
 * @param {Date | FixedDate | null} [date] - The date to retrieve the month from.
 * @param {FormatDateParams["monthFormat"]} [format] - The format of the month string.
 * @returns {string} The month as a formatted string.
 */
export function getMonthName(
  date: Date | FixedDate | null = new Date(),
  format: FormatDateParams["monthFormat"] = "short"
): string {
  const month = formatDate(date, { format: "M", monthFormat: format });
  return month;
}

/**
 * Retrieves the month from a given date as a formatted string.
 *
 * This function takes a Date object, a FixedDate object, or null and returns
 * the month in the specified format. If no date is provided, the current date is used.
 *
 * @param {Date | FixedDate | null} [date=new Date()] - The date from which to extract the month.
 * @param {FormatDateParams["monthFormat"]} [format="short"] - The format to use for the month.
 * @returns {string} The month extracted from the date, formatted as a string.
 */
export function getMonth(
  date: Date | FixedDate | null = new Date(),
  format: FormatDateParams["monthFormat"] = "short"
): string {
  const month = formatDate(date, { format: "MM", monthFormat: format });
  return month;
}

/**
 * Retrieves the year from a given date as a string.
 *
 * This function takes a Date object, a FixedDate object, or null and returns
 * the year in the "YYYY" format. If no date is provided, the current date is used.
 *
 * @param {Date | FixedDate | null} [date=new Date()] - The date from which to extract the year.
 * @returns {string} The year extracted from the date, formatted as a string.
 */
export function getYear(date: Date | FixedDate | null = new Date()): string {
  const year = formatDate(date, { format: "YYYY" });
  return year;
}

type FormatTimeParams = {
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
export function formatTime(
  date: Date,
  { format = "hh:mmA" }: FormatTimeParams = {}
): string {
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
export function formatDateTime(
  date: Date,
  {
    dateFormat = "DD/MM/YYYY",
    timeFormat = "hh:mmA",
    seperator = " | ",
  }: FormatDateAndTimeParams = {}
): string {
  if (!(date instanceof Date)) {
    throw new TypeError("Expected a Date object, but received " + typeof date);
  }

  const formattedDate = formatDate(date, { format: dateFormat });
  const formattedTime = formatTime(date, { format: timeFormat });

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
