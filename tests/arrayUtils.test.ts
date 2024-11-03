import {
  chunk,
  flatten,
  uniqueArray,
  uniqueArrayByKey,
} from "../src/arrayUtils";

test("uniqueArray", () => {
  expect(uniqueArray([1, 2, 3, 2, 1])).toEqual([1, 2, 3]);
});

test("uniqueArrayByKey", () => {
  const array = [
    { id: 1, name: "John" },
    { id: 2, name: "Jane" },
    { id: 1, name: "John" },
  ];

  expect(uniqueArrayByKey({ array, key: "id" })).toEqual([
    { id: 1, name: "John" },
    { id: 2, name: "Jane" },
  ]);
});

test("chunk", () => {
  expect(chunk({ array: [1, 2, 3, 4, 5, 6], size: 2 })).toEqual([
    [1, 2],
    [3, 4],
    [5, 6],
  ]);
});

test("flatten", () => {
  expect(
    flatten([
      [1, 2],
      [3, 4],
      [5, 6],
    ])
  ).toEqual([1, 2, 3, 4, 5, 6]);
});
