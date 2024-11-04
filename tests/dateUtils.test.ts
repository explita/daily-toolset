import {
  formatDate,
  formatDateTime,
  formatTime,
  timeAgo,
} from "../src/dateUtils";

describe("formatDate", () => {
  test("should return 'January 1, 2024' for a date", () => {
    expect(
      formatDate({ date: new Date("2024-01-01"), format: "Month DD, YYYY" })
    ).toBe("January 1, 2024");
  });
  test('should return the current date in "YYYY-MM-DD" format', () => {
    expect(formatDate({ date: new Date() })).toBe(
      new Date().toISOString().split("T")[0]
    );
  });
});

describe("timeAgo", () => {
  test('should return "a few seconds ago" for a date in the past', () => {
    expect(timeAgo(new Date())).toBe("a few seconds ago");
  });

  test("should return '1 minute ago' for a date 1 minute ago", () => {
    const date = new Date();
    date.setMinutes(date.getMinutes() - 1);
    expect(timeAgo(date)).toBe("1 minute ago");
  });

  test("should return '1 hour ago' for a date 1 hour ago", () => {
    const date = new Date();
    date.setHours(date.getHours() - 1);
    expect(timeAgo(date)).toBe("1 hour ago");
  });
});

describe("formatTime", () => {
  test('should return "12:00AM" for a given date', () => {
    expect(formatTime({ date: new Date() })).toBe("12:00AM");
  });

  test('should return "20:42:50" for a given date', () => {
    expect(formatTime({ date: new Date(), format: "HH:mm:ss" })).toBe(
      "20:42:50"
    );
  });

  test('should return "20:43" for a given date', () => {
    expect(formatTime({ date: new Date(), format: "HH:mm" })).toBe("20:43");
  });

  test('should return "08:45:34PM" for a given date', () => {
    expect(formatTime({ date: new Date(), format: "hh:mm:ssA" })).toBe(
      "08:45:34PM"
    );
  });

  test('should return "20:47:3.555" for a given date', () => {
    expect(formatTime({ date: new Date(), format: "HH:mm:ss.SSS" })).toBe(
      "20:47:3.555"
    );
  });
});

test('formatDateTime should return "25 October 2023 at 02:30PM"', () => {
  expect(
    formatDateTime({
      date: new Date("2023-10-25T14:30:00"),
    })
  ).toBe("October 25, 2023 | 02:30PM");
});

test('formatDateTime should return "25 October 2023"', () => {
  expect(
    formatDateTime({
      date: new Date("2023-10-25T14:30:00"),
      dateFormat: "Month DD, YYYY",
      timeFormat: "hh:mmA",
    })
  ).toBe("October 25, 2023");
});
