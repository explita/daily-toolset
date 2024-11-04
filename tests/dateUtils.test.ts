import { formatDate, timeAgo } from "../src/dateUtils";

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
