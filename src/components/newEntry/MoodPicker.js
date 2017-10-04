import React, { Component } from 'react';
import { View, Picker } from 'react-native';

const DEFAULT_MOOD = "1";
const DEFAULT_VALUE = "2";

class MoodPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.state.mood = props.mood ? props.mood : DEFAULT_MOOD;
    this.state.value = props.value ? props.value : DEFAULT_VALUE;
  }

  onMoodPick(_mood, index) {
    this.setState(state => {
      return {
        ...state,
        mood: _mood
      }
    })
  }

  onValuePick(_value, index) {
    this.setState(state => {
      return {
        ...state,
        value: _value
      }
    })
  }

  render() {
    return (
      <View style={{flexDirection: 'row'}}>
        <Picker
          style={{flex: 1}}
          selectedValue={this.state.mood}
          onValueChange={this.onMoodPick.bind(this)}>
          <Picker.Item label="Test1" value="1" />
          <Picker.Item label="Test2" value="2" />
        </Picker>
        <Picker
          style={{flex: 1}}
          selectedValue={this.state.value}
          onValueChange={this.onValuePick.bind(this)}>
          <Picker.Item label="Test1" value="1" />
          <Picker.Item label="Test2" value="2" />
        </Picker>
      </View>
    )
  }
}

export default MoodPicker;
