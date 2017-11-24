import 'react-native';
import React from 'react';
import LoadingSpinner from '../../../components/common/LoadingSpinner';
import { Text } from 'native-base';

import renderer from 'react-test-renderer';

test('Loading spinner renders correctly', () => {
  const tree = renderer.create(
    <LoadingSpinner />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Loading spinner with text renders correctly', () => {
  const tree = renderer.create(
    <LoadingSpinner>
      <Text>Some text</Text>
    </LoadingSpinner>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
