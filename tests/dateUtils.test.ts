import { formatDate, timeAgo } from "../src/dateUtils";

test("", () => {
  expect(formatDate(new Date())).toBe(new Date().toISOString().split("T")[0]);
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
