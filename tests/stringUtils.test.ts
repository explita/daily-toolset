import {
  addOrdinal,
  buildQueryString,
  camelToTitle,
  capitalize,
  chunkSplit,
  formatCurrency,
  parseQueryString,
  slugify,
  uniqueString,
} from "../src/stringUtils";

test("capitalize should capitalize the first letter", () => {
  expect(capitalize("hello")).toBe("Hello");
});

test("slugify should convert text to a URL-friendly slug", () => {
  expect(slugify("Hello World")).toBe("hello-world");
});

test("camelToTitle should convert camelCase to Title Case", () => {
  expect(camelToTitle("helloWorld")).toBe("Hello World");
});

test("parseQueryString should parse the query string from a URL", () => {
  expect(parseQueryString("https://example.com?name=John&age=30")).toEqual({
    name: "John",
    age: "30",
  });
});

test("buildQueryString should build a query string from an object or string", () => {
  expect(buildQueryString("foo=bar")).toEqual("foo=bar");
});

test("addOrdinal should add an ordinal to a number", () => {
  expect(addOrdinal(1)).toBe("1st");
});

test("chunkSplit should split a string into chunks", () => {
  expect(chunkSplit(123456789, { groupSize: 3, separator: "," })).toBe(
    "123,456,789"
  );
});

test("uniqueString should generate a unique string", () => {
  expect(uniqueString({ length: 16 })).toHaveLength(16);
});

test("", () => {
  expect(formatCurrency({ amount: 1234.56, currency: "$" })).toBe("$1,234.56");
});
