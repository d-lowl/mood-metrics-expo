import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import Styles from '../styles/main.js';

class NewEntryComponent extends Component {
  static navigationOptions = {
    title: 'New Entry',
  }

  render() {
    return (
      <View style={Styles.content}>
        <Text>New Entry</Text>
      </View>
    );
  }
}

export default NewEntryComponent;
