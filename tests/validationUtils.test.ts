import { isEmpty, isValidEmail, isValidPhone } from "../src/validationUtils";

describe("isEmpty", () => {
  test("should return true for null", () => {
    expect(isEmpty(null)).toBe(true);
  });

  test("should return false for 'yes'", () => {
    expect(isEmpty("yes")).toBe(false);
  });

  test("should return true for {}", () => {
    expect(isEmpty({})).toBe(true);
  });

  test("should return false for {key: 'value'}", () => {
    expect(isEmpty({ key: "value" })).toBe(false);
  });

  test("should return false for [1]", () => {
    expect(isEmpty([1])).toBe(false);
  });

  test("should return true for []", () => {
    expect(isEmpty([])).toBe(true);
  });
});

describe("isValidPhone", () => {
  test("should return true for a valid phone number", () => {
    expect(isValidPhone("+1 1234567")).toBe(true);
  });

  test("should return false for an invalid phone number", () => {
    expect(isValidPhone("w123-4567")).toBe(false);
  });
});

describe("isValidEmail", () => {
  test("should return true for a valid email address", () => {
    expect(isValidEmail("aaa@bbb.ccc")).toBe(true);
  });

  test("should return false for an invalid email address", () => {
    expect(isValidEmail("aaa")).toBe(false);
  });
});
