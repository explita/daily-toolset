import { randomNumber } from "../src/numberUtils";

describe("randomNumber", () => {
  it("should generate a random number with the specified length", () => {
    const length = 6;
    const result = randomNumber(length);
    expect(result.toString().length).toBe(length);
  });

  it("should generate a random number with a default length of 8", () => {
    const result = randomNumber();
    expect(result.toString().length).toBe(8);
  });
});
