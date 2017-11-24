import { capitalise } from '../../utils/StringHelper.js';

test('Empty string is not capitalised', () => {
  expect("").toBe(capitalise(""));
})

test('One symbol string is capitalised correctly', () => {
  expect("A").toBe(capitalise("a"));
})

test('Longer string is capitalised correcly', () => {
  expect("Abc").toBe(capitalise("abc"));
})

test('Already capitalised string stays the same', () => {
  expect("A").toBe(capitalise("A"));
})
