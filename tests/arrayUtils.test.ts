import {
  chunk,
  flatten,
  shuffleArray,
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

test("shuffleArray returns a shuffled array", () => {
  const array = [1, 2, 3, "a", "b", "c"];
  const shuffledArray = shuffleArray(array);

  // Check that the shuffled array contains the same elements
  expect(shuffledArray).toHaveLength(array.length);
  expect(shuffledArray).toEqual(expect.arrayContaining(array));

  // Check that the array order is not strictly the same as the original
  // (though this is not guaranteed, it’s a good indicator)
  const isDifferentOrder = shuffledArray.some(
    (item, index) => item !== array[index]
  );
  expect(isDifferentOrder).toBe(true);
});
