import 'react-native';
import React from 'react';
import FullScreenContent from '../../../components/common/FullScreenContent';
import { Text } from 'native-base';

import renderer from 'react-test-renderer';

test('FullScreenContent renders correctly', () => {
  const tree = renderer.create(
    <FullScreenContent />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

test('FullScreenContent with full width renders correctly', () => {
  const tree = renderer.create(
    <FullScreenContent fullWidth />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

test('FullScreenContent highlighed renders correctly', () => {
  const tree = renderer.create(
    <FullScreenContent highlight />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
