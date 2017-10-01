import React, { Component } from 'react';
import { View, Text } from 'react-native';

class Main extends Component {
  static navigationOptions = {
    title: 'Main',
  }

  render() {
    return (
      <View>
        <Text>React Native Boilerplate Test</Text>
      </View>
    );
  }
}

export default Main;
