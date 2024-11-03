import { transformObject } from "../src/objectUtils";

describe("transformObject", () => {
  test("should transform a nested object into a flat object", () => {
    const expected = {
      key1: "value1",
      key2: "value2",
      key3: {
        key4: "value4",
        key5: "value5",
      },
      key6: {
        key7: "value7",
        key8: "value8",
      },
    };

    const input = {
      key1: "value1",
      key2: "value2",
      "key3.key4": "value4",
      "key3.key5": "value5",
      "key6.key7": "value7",
      "key6.key8": "value8",
    };

    expect(transformObject(input)).toEqual(expected);
  });
});
