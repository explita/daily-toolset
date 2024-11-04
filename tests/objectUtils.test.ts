import {
  omitFromObject,
  pickFromObject,
  prependToObjectKey,
  transformObject,
} from "../src/objectUtils";

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

test("prependToObjectKey should append a key to an object", () => {
  const obj = {
    key1: "value1",
    key2: "value2",
    key3: "value3",
    key4: "value4",
    key5: "value5",
    key6: "value6",
    key7: "value7",
    key8: "value8",
  };

  const expected = {
    keykey1: "value1",
    keykey2: "value2",
    keykey3: "value3",
    keykey4: "value4",
    keykey5: "value5",
    keykey6: "value6",
    keykey7: "value7",
    keykey8: "value8",
  };

  expect(prependToObjectKey(obj, "key")).toEqual(expected);
});

test("pickFromObject should pick keys from an object", () => {
  const obj = {
    key1: "value1",
    key2: "value2",
    key3: "value3",
    key4: "value4",
    key5: "value5",
    key6: "value6",
    key7: "value7",
    key8: "value8",
  };

  const expected = {
    key1: "value1",
    key2: "value2",
    key3: "value3",
    key4: "value4",
    key5: "value5",
    key6: "value6",
    key7: "value7",
  };

  expect(
    pickFromObject({
      obj,
      keys: ["key1", "key2", "key3", "key4", "key5", "key6", "key7"],
    })
  ).toEqual(expected);
});

test("omitFromObject should omit keys from an object", () => {
  const obj = {
    key1: "value1",
    key2: "value2",
    key3: "value3",
    key4: "value4",
    key5: "value5",
    key6: "value6",
    key7: "value7",
    key8: "value8",
  };

  const expected = {
    key1: "value1",
    key2: "value2",
    key3: "value3",
    key4: "value4",
    key5: "value5",
    key6: "value6",
  };

  expect(
    omitFromObject({
      obj,
      keys: ["key7", "key8"],
    })
  ).toEqual(expected);
});
