import React, { Component } from 'react';
import { View, Text, Button, Picker } from 'react-native';
import Styles from '../../styles/main.js';
import MoodPicker from './MoodPicker.js';

class NewEntryComponent extends Component {
  render() {
    return (
      <View style={Styles.content}>
        <Text>New Entry</Text>
        <MoodPicker />
        <Button
          onPress={() => {this.props.newEntry("test",3)}}
          title="State"
        />
      </View>
    )
  }
}

export default NewEntryComponent;
