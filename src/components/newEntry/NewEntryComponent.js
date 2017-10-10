import React, { Component } from 'react';
import { View, Text, Button, Picker } from 'react-native';
import Styles from '../../styles/main.js';
// import MoodPicker from './MoodPicker.js';
import AbsoluteMoodSlider from './AbsoluteMoodSlider.js';

class NewEntryComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {factor: 1};
  }
  render() {
    // this.setState({sw: 100});
    return (
      <View style={Styles.content}>
        <Text>New Entry</Text>
        <AbsoluteMoodSlider name="Anger"/>
        <AbsoluteMoodSlider name="Disgust"/>
        <AbsoluteMoodSlider name="Fear"/>
        <AbsoluteMoodSlider name="Joy"/>
        <AbsoluteMoodSlider name="Sadness"/>
        <AbsoluteMoodSlider name="Surprise"/>
        <Button
          onPress={() => {this.props.newEntry("test",3)}}
          title="State"
        />
      </View>
    )
  }
}

export default NewEntryComponent;
