import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colorSchema from '../../styles/colorSchema.js';
// import MoodPicker from './MoodPicker.js';
import Slider from 'react-native-slider';

class NewEntryComponent extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    console.log(this.props.name.toLowerCase())
    const schema = colorSchema[this.props.name.toLowerCase()] ||
                   colorSchema.joy;
    return (
      <View style={style.view}>
        <Text style={style.label}>{this.props.name}</Text>
        <Slider
          style={style.slider}
          minimumTrackTintColor={schema.left}
          maximumTrackTintColor={schema.right}
          thumbTintColor={schema.thumb}
          maximumValue={7}
          step={1}/>
      </View>
    )
  }
}

const style = StyleSheet.create({
  view: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  label: {
    flex: 0.3
  },
  slider: {
    flex: 1
  }
})

export default NewEntryComponent;
