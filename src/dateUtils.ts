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

type FixedDate = string; //`${string | number}-${string | number}-${string | number}`;

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
 * @returns {string} The month extracted from the date, formatted as a number.
 */
export function getMonth(date: Date | FixedDate | null = new Date()): number {
  const month = formatDate(date, { format: "MM" });
  return Number(month);
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
export function getYear(date: Date | FixedDate | null = new Date()): number {
  const year = formatDate(date, { format: "YYYY" });
  return Number(year);
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
  date: Date | FixedDate | null = new Date(),
  { format = "hh:mmA" }: FormatTimeParams = {}
): string {
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
  date: Date | FixedDate | null = new Date(),
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

/**
 * Adds the given number of days to the given date and returns a new Date object.
 *
 * @param {number} days - The number of days to add to the date.
 * @param {Date} [date=new Date()] - The date to add the days to. Defaults to the current date.
 * @returns {Date} - A new Date object with the given number of days added.
 */
export function addDays(days: number, date: Date = new Date()): Date {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + days);
  return newDate;
}

/**
 * Adds the given number of months to the given date and returns a new Date object.
 *
 * @param {number} months - The number of months to add to the date.
 * @param {Date} [date=new Date()] - The date to add the months to. Defaults to the current date.
 * @returns {Date} - A new Date object with the given number of months added.
 */
export function addMonths(months: number, date: Date = new Date()): Date {
  const newDate = new Date(date);
  newDate.setMonth(newDate.getMonth() + months);
  return newDate;
}

/**
 * Adds the given number of years to the given date and returns a new Date object.
 *
 * @param {number} years - The number of years to add to the date.
 * @param {Date} [date=new Date()] - The date to add the years to. Defaults to the current date.
 * @returns {Date} - A new Date object with the given number of years added.
 */
export function addYears(years: number, date: Date = new Date()): Date {
  const newDate = new Date(date);
  newDate.setFullYear(newDate.getFullYear() + years);
  return newDate;
}

/**
 * Adds the given number of hours to the given date and returns a new Date object.
 *
 * @param {number} hours - The number of hours to add to the date.
 * @param {Date} [date=new Date()] - The date to add the hours to. Defaults to the current date.
 * @returns {Date} - A new Date object with the given number of hours added.
 */
export function addHours(hours: number, date: Date = new Date()): Date {
  const newDate = new Date(date);
  newDate.setHours(newDate.getHours() + hours);
  return newDate;
}

/**
 * Adds the given number of minutes to the given date and returns a new Date object.
 *
 * @param {number} minutes - The number of minutes to add to the date.
 * @param {Date} [date=new Date()] - The date to add the minutes to. Defaults to the current date.
 * @returns {Date} - A new Date object with the given number of minutes added.
 */
export function addMinutes(minutes: number, date: Date = new Date()): Date {
  const newDate = new Date(date);
  newDate.setMinutes(newDate.getMinutes() + minutes);
  return newDate;
}

/**
 * Adds the specified number of seconds to a given date and returns a new Date object.
 *
 * @param {number} seconds - The number of seconds to add to the date.
 * @param {Date} [date=new Date()] - The date to which the seconds will be added. Defaults to the current date.
 * @returns {Date} A new Date object with the specified number of seconds added.
 */
export function addSeconds(seconds: number, date: Date = new Date()): Date {
  const newDate = new Date(date);
  newDate.setSeconds(newDate.getSeconds() + seconds);
  return newDate;
}

/**
 * Retrieves the number of days in a given month.
 *
 * This function takes a Date object and returns the number of days in its
 * corresponding month. If no Date object is provided, it defaults to the
 * current month.
 *
 * @param {Date} [date=new Date()] - The date to retrieve the days in month from.
 * @returns {number} The number of days in the month.
 */
export function daysInMonth(date: Date = new Date()): number {
  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

  return Math.ceil(
    (lastDay.getTime() - firstDay.getTime()) / (1000 * 60 * 60 * 24) + 1
  );
}

/**
 * Returns true if the given date is today, false otherwise.
 *
 * @param {Date} date The date to check.
 * @returns {boolean} True if the given date is today.
 */
export function isToday(date: Date): boolean {
  if (!date || isNaN(date.getTime())) return false;

  const today = new Date();

  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
}

/**
 * Returns true if the given date is tomorrow, false otherwise.
 *
 * @param {Date} date The date to check.
 * @returns {boolean} True if the given date is tomorrow.
 */
export function isTomorrow(date: Date): boolean {
  if (!date || isNaN(date.getTime())) return false;

  const today = new Date();
  today.setDate(today.getDate() + 1);

  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
}

/**
 * Checks if a given date is yesterday.
 *
 * This function determines whether the provided date corresponds to the day
 * before the current date. It returns true if the date is yesterday, otherwise
 * it returns false.
 *
 * @param {Date} date - The date to check.
 * @returns {boolean} - `true` if the date is yesterday, `false` otherwise.
 */
export function isYesterday(date: Date): boolean {
  if (!date || isNaN(date.getTime())) return false;

  const today = new Date();
  today.setDate(today.getDate() - 1);

  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
}

type IsPastOptions = {
  includeTime?: boolean;
};

/**
 * Checks if a given date is in the past.
 *
 * Takes a Date object and determines if it is earlier than the current date.
 * Returns a boolean indicating whether the date is in the past.
 *
 * @param {Date} date The date to check.
 * @param {IsPastOptions} options Configuration options
 * @param {boolean} [options.includeTime=true] Whether to include time in the comparison
 * @returns {boolean} `true` if the date is in the past.
 */
export function isPast(
  date: Date,
  options: IsPastOptions = { includeTime: true }
): boolean {
  if (!date || isNaN(date.getTime())) return false;

  const today = new Date();

  if (!options.includeTime) {
    return (
      new Date(date.getFullYear(), date.getMonth(), date.getDate()) <
      new Date(today.getFullYear(), today.getMonth(), today.getDate())
    );
  }

  return date < today;
}

type IsFutureOptions = {
  includeTime?: boolean;
};

/**
 * Checks if a given date is in the future.
 *
 * Takes a Date object and determines if it is later than the current date.
 * Returns a boolean indicating whether the date is in the future.
 *
 * @param {Date} date The date to check.
 * @param {IsFutureOptions} options Configuration options
 * @param {boolean} [options.includeTime=true] Whether to include time in the comparison
 * @returns {boolean} `true` if the date is in the future.
 */
export function isFuture(
  date: Date,
  options: IsFutureOptions = { includeTime: true }
): boolean {
  if (!date || isNaN(date.getTime())) return false;

  const today = new Date();

  if (!options.includeTime) {
    return (
      new Date(date.getFullYear(), date.getMonth(), date.getDate()) >
      new Date(today.getFullYear(), today.getMonth(), today.getDate())
    );
  }

  return date > today;
}

/**
 * Returns the number of days between two dates.
 *
 * This function takes two dates and calculates the number of days
 * between them. It returns the difference in days as an integer.
 *
 * @param {Date} date1 - The first date to compare.
 * @param {Date} date2 - The second date to compare.
 * @returns {number} - The number of days between the two dates.
 */
export function daysBetween(date1: Date, date2: Date): number {
  if (!date1 || !date2 || isNaN(date1.getTime()) || isNaN(date2.getTime()))
    return 0;

  const timeDiff = Math.abs(date1.getTime() - date2.getTime());
  const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
  return diffDays;
}

/**
 * Returns the number of hours between two dates.
 *
 * This function takes two dates and calculates the number of hours
 * between them. The returned value is an integer and is always
 * positive (i.e., the order of the dates does not matter).
 */
export function hoursBetween(date1: Date, date2: Date): number {
  if (!date1 || !date2 || isNaN(date1.getTime()) || isNaN(date2.getTime()))
    return 0;

  const timeDiff = Math.abs(date1.getTime() - date2.getTime());
  const diffHours = Math.ceil(timeDiff / (1000 * 3600));
  return diffHours;
}

/**
 * Returns the number of minutes between two dates.
 *
 * This function takes two dates and calculates the number of minutes
 * between them. It returns the difference in minutes as an integer.
 *
 * @param {Date} date1 - The first date to compare.
 * @param {Date} date2 - The second date to compare.
 * @returns {number} - The number of minutes between the two dates.
 */
export function minutesBetween(date1: Date, date2: Date): number {
  if (!date1 || !date2 || isNaN(date1.getTime()) || isNaN(date2.getTime()))
    return 0;

  const timeDiff = Math.abs(date1.getTime() - date2.getTime());
  const diffMinutes = Math.ceil(timeDiff / (1000 * 60));
  return diffMinutes;
}

/**
 * Returns the number of days since the given date.
 *
 * This function takes a date and calculates the number of days that have
 * passed since that date. If the given date is in the future, it returns 0.
 *
 * @param {Date} date - The date to calculate the number of days since.
 * @returns {number} - The number of days since the given date.
 */
export function daysSince(date: Date): number {
  if (!date || isNaN(date.getTime())) return 0;

  const today = new Date();

  if (date >= today) return 0;

  const timeDiff = Math.abs(today.getTime() - date.getTime());
  const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
  return diffDays;
}

/**
 * Returns the number of days until the given date from today.
 *
 * @param {Date} date - The date to calculate the number of days until.
 * @returns {number} - The number of days until the given date from today.
 * @throws {Error} - Throws an error if the date is null, undefined, or in the past.
 */
export function daysUntil(date: Date): number {
  if (!date || isNaN(date.getTime())) return 0;

  const today = new Date();

  if (date <= today) return 0;

  const timeDiff = Math.abs(date.getTime() - today.getTime());
  const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
  return diffDays;
}

/**
 * Calculates the number of hours since the given date.
 *
 * @param {Date} date - The date to calculate the hours since.
 * @returns {number} The number of hours since the given date.
 */
export function hoursSince(date: Date): number {
  if (!date || isNaN(date.getTime())) return 0;

  const today = new Date();

  if (date >= today) return 0;

  const timeDiff = Math.abs(today.getTime() - date.getTime());
  const diffHours = Math.ceil(timeDiff / (1000 * 3600));
  return diffHours;
}

/**
 * Calculates the number of hours until the given date.
 *
 * @param {Date} date - The date to calculate the hours until.
 * @returns {number} The number of hours until the given date.
 */
export function hoursUntil(date: Date): number {
  if (!date || isNaN(date.getTime())) return 0;

  const today = new Date();

  if (date <= today) return 0;

  const timeDiff = Math.abs(date.getTime() - today.getTime());
  const diffHours = Math.ceil(timeDiff / (1000 * 3600));
  return diffHours;
}

/**
 * Retrieves the day of the year from a given date.
 *
 * @param {Date | FixedDate | null} date - The date to retrieve the day from. Defaults to the current date.
 * @returns {number} The day of the year (1-365) as per ISO 8601.
 */
export function dayOfYear(date: Date = new Date()): number {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - start.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  const day = Math.floor(diff / oneDay);

  return day;
}

/**
 * Retrieves the week of the year from a given date.
 *
 * @param {Date | FixedDate | null} date - The date to retrieve the week from. Defaults to the current date.
 * @returns {number} The week of the year (1-52) as per ISO 8601.
 */
export function weekOfYear(date: Date = new Date()): number {
  const start = new Date(date.getFullYear(), 0, 1);
  const diff = date.getTime() - start.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  const day = Math.floor(diff / oneDay);
  const week = Math.floor(day / 7);

  return week + 1;
}

/**
 * Validates if the provided string is a valid ISO date.
 *
 * This function checks if a given string matches the ISO date format
 * using a regular expression. It then attempts to parse it into a
 * JavaScript Date object to ensure it represents a valid date.
 *
 * @param {string} value - The string to validate as a date.
 * @returns {boolean} - True if the string is a valid date, false otherwise.
 */
export function isValidDate(value: string): boolean {
  if (typeof value !== "string") return false;

  const isoDateRegex = /^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}:\d{2}(\.\d{3})?(Z)?)?$/;

  if (!isoDateRegex.test(value)) return false;

  const date = new Date(value);

  return !isNaN(date.getTime());
}

/**
 * Extracts the years, months, and days from a given date of birth.
 *
 * This function takes a Date object and returns an object with the years,
 * months, and days properties.
 *
 * @param {Date} dateOfBirth - The date of birth to extract the years, months, and days from.
 * @returns {object} An object with the years, months, and days properties.
 */
export function ageFromDOB(dateOfBirth: Date | string): {
  years: number;
  months: number;
  days: number;
} {
  if (typeof dateOfBirth === "string" && !isValidDate(dateOfBirth)) {
    throw new Error(
      `Invalid date string provided: "${dateOfBirth}". Expected format: YYYY-MM-DD or similar.`
    );
  }

  if (typeof dateOfBirth === "string" && isValidDate(dateOfBirth)) {
    dateOfBirth = new Date(dateOfBirth);
  }

  if (!(dateOfBirth instanceof Date)) {
    throw new TypeError(
      "Expected a Date object, but received " + typeof dateOfBirth
    );
  }

  const today = new Date();

  let years = today.getFullYear() - dateOfBirth.getFullYear();

  let months = today.getMonth() - dateOfBirth.getMonth();
  let days = today.getDate() - dateOfBirth.getDate();

  if (days < 0) {
    days += new Date(today.getFullYear(), today.getMonth(), 0).getDate(); // get last day of previous month
    months -= 1;
  }

  if (months < 0) {
    months += 12;
  }

  const hasBirthdayPassed =
    today.getMonth() > dateOfBirth.getMonth() ||
    (today.getMonth() === dateOfBirth.getMonth() &&
      today.getDate() >= dateOfBirth.getDate());

  if (!hasBirthdayPassed) {
    years -= 1;
  }

  return { years, months, days };
}
