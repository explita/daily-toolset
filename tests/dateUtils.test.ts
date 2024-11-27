import {
  addDays,
  addHours,
  addMinutes,
  addMonths,
  addSeconds,
  addYears,
  daysBetween,
  daysSince,
  daysInMonth,
  daysUntil,
  formatDate,
  formatDateTime,
  formatTime,
  hoursBetween,
  isToday,
  minutesBetween,
  timeAgo,
  dayOfYear,
  weekOfYear,
  isValidDate,
} from "../src/dateUtils";

// describe("formatDate", () => {
//   test("should return 'January 1, 2024' for a date", () => {
//     expect(
//       formatDate(new Date("2024-01-01"), { format: "Month DD, YYYY" })
//     ).toBe("January 1, 2024");
//   });
//   test('should return the current date in "YYYY-MM-DD" format', () => {
//     expect(formatDate(new Date())).toBe(new Date().toISOString().split("T")[0]);
//   });
//   test('should return the current date in "DD/MM/YYYY" format', () => {
//     expect(formatDate(null, { format: "YYYY" })).toBe("2024");
//   });
// });

// describe("timeAgo", () => {
//   test('should return "a few seconds ago" for a date in the past', () => {
//     expect(timeAgo(new Date())).toBe("a few seconds ago");
//   });

//   test("should return '1 minute ago' for a date 1 minute ago", () => {
//     const date = new Date();
//     date.setMinutes(date.getMinutes() - 1);
//     expect(timeAgo(date)).toBe("1 minute ago");
//   });

//   test("should return '1 hour ago' for a date 1 hour ago", () => {
//     const date = new Date();
//     date.setHours(date.getHours() - 1);
//     expect(timeAgo(date)).toBe("1 hour ago");
//   });
// });

// describe("formatTime", () => {
//   test('should return "12:00AM" for a given date', () => {
//     expect(formatTime(new Date())).toBe("12:00AM");
//   });

//   test('should return "20:42:50" for a given date', () => {
//     expect(formatTime(new Date(), { format: "HH:mm:ss" })).toBe("20:42:50");
//   });

//   test('should return "20:43" for a given date', () => {
//     expect(formatTime(new Date(), { format: "HH:mm" })).toBe("20:43");
//   });

//   test('should return "08:45:34PM" for a given date', () => {
//     expect(formatTime(new Date(), { format: "hh:mm:ssA" })).toBe("08:45:34PM");
//   });

//   test('should return "20:47:3.555" for a given date', () => {
//     expect(formatTime(new Date(), { format: "HH:mm:ss.SSS" })).toBe(
//       "20:47:3.555"
//     );
//   });
// });

// test('formatDateTime should return "25 October 2023 at 02:30PM"', () => {
//   expect(formatDateTime(new Date("2023-10-25T14:30:00"))).toBe(
//     "October 25, 2023 | 02:30PM"
//   );
// });

// test('formatDateTime should return "25 October 2023"', () => {
//   expect(
//     formatDateTime(new Date("2023-10-25T14:30:00"), {
//       dateFormat: "Month DD, YYYY",
//       timeFormat: "hh:mmA",
//     })
//   ).toBe("October 25, 2023");
// });

// test("addDays should add 5 days to a date", () => {
//   const date = new Date("2023-10-25T14:30:00");
//   expect(addDays(5, date)).toEqual(new Date("2023-10-30T14:30:00"));
// });

// test("addMonths should add 5 months to a date", () => {
//   const date = new Date("2023-10-25T14:30:00");
//   expect(addMonths(5, date)).toEqual(new Date("2024-03-25T14:30:00"));
// });

// test("addYears should add 5 years to a date", () => {
//   const date = new Date("2023-10-25T14:30:00");
//   expect(addYears(5, date)).toEqual(new Date("2028-10-25T14:30:00"));
// });

// test("addHours should add 5 hours to a date", () => {
//   const date = new Date("2023-10-25T14:30:00");
//   expect(addHours(5, date)).toEqual(new Date("2023-10-25T19:30:00"));
// });

// test("addMinutes should add 5 minutes to a date", () => {
//   const date = new Date("2023-10-25T14:30:00");
//   expect(addMinutes(5, date)).toEqual(new Date("2023-10-25T14:35:00"));
// });

// test("addSeconds should add 5 seconds to a date", () => {
//   const date = new Date("2023-10-25T14:30:00");
//   expect(addSeconds(5, date)).toEqual(new Date("2023-10-25T14:30:05"));
// });

// test("daysInMonth should return the number of days in the current month", () => {
//   const date = new Date("2023-10-25T14:30:00");
//   expect(daysInMonth(date)).toBe(31);
// });

// test("isToday should return true if the date is today", () => {
//   const date = new Date("2024-11-27");
//   expect(isToday(date)).toBe(true); // Assuming today's date is "2023-10-25"
// });

// test("daysBetween should return the number of days between two dates", () => {
//   const date1 = new Date("2023-10-25T14:30:00");
//   const date2 = new Date("2023-11-24T14:30:00");
//   expect(daysBetween(date1, date2)).toBe(30);
// });

// test("hoursBetween should return the number of hours between two dates", () => {
//   const date1 = new Date("2023-10-25T14:30:00");
//   const date2 = new Date("2023-11-24T14:30:00");
//   expect(hoursBetween(date2, date1)).toBe(720);
// });

// test("minutesBetween should return the number of minutes between two dates", () => {
//   const date1 = new Date("2023-10-25T14:30:00");
//   const date2 = new Date("2023-11-24T14:30:00");
//   expect(minutesBetween(date1, date2)).toBe(43200);
// });

// test("daysSince should return the number of days since a given date", () => {
//   const date = new Date("2023-10-25T14:30:00");
//   expect(daysSince(date)).toBe(25);
// });

// test("daysUntil should return the number of days until a given date", () => {
//   const date = new Date("2023-10-25T14:30:00");
//   expect(daysUntil(date)).toBe(75);
// });

// test("dayOfYear should return the day of the year for a given date", () => {
//   const date = new Date("2023-10-25T14:30:00");
//   expect(dayOfYear(date)).toBe(275); // Assuming 2023 is a leap year
// });

// test("weekOfYear should return the week of the year for a given date", () => {
//   const date = new Date("2023-10-25T14:30:00");
//   expect(weekOfYear(date)).toBe(43); // Assuming 2023 is a leap year
// });

// test("formatDate should return the formatted date string", () => {
//   const date = new Date("2023-10-25T14:30:00");
//   expect(
//     formatDate(date, { format: "Month DD, YYYY", monthFormat: "long" })
//   ).toBe("October 25, 2023");
// });

// test("isValidDate should return true for a valid date string", () => {
//   expect(isValidDate("2023-10-25")).toBe(true);
// });

// test("isValidDate should return false for an invalid date string", () => {
//   expect(isValidDate("invalid-date")).toBe(false);
// });
