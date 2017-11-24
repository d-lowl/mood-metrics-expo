import 'react-native';
import React from 'react';
import NewEntryComponent from '../../../components/newEntry/NewEntryComponent';

import renderer from 'react-test-renderer';

function generateTestMoodLists() {
  return [{
    anger: 0,
    disgust: 0,
    fear: 0,
    joy: 0,
    sadness: 0,
    surprise: 0
  }];
}

test('NewEntryComponent renders correctly', () => {
  const tree = renderer.create(
    <NewEntryComponent />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

test('NewEntryComponent in absolute mode renders correctly', () => {
  const tree = renderer.create(
    <NewEntryComponent inRelativeMode={false} />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

test('NewEntryComponent in relative mode renders correctly', () => {
  const tree = renderer.create(
    <NewEntryComponent inRelativeMode={true} />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

test('NewEntryComponent with empty mood renders correctly', () => {
  const tree = renderer.create(
    <NewEntryComponent
      inRelativeMode={true}
      mood={{}}/>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

test('NewEntryComponent with various mood inputs renders correctly', () => {
  const moods = generateTestMoodLists();
  for(var v in moods)
  {
    const tree = renderer.create(
      <NewEntryComponent
        inRelativeMode={true}
        mood={moods[v]}/>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  }
});

// test('FullScreenContent with full width renders correctly', () => {
//   const tree = renderer.create(
//     <FullScreenContent fullWidth />
//   ).toJSON();
//   expect(tree).toMatchSnapshot();
// });
//
// test('FullScreenContent highlighed renders correctly', () => {
//   const tree = renderer.create(
//     <FullScreenContent highlight />
//   ).toJSON();
//   expect(tree).toMatchSnapshot();
// });
