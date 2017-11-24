import React, { Component } from 'react';
import { View } from 'react-native';
import { Text } from 'native-base';
import colorSchema from '../../styles/colorSchema.js';
import sliderStyles from '../../styles/sliders.js';
import Slider from 'react-native-slider';

class AbsoluteMoodSlider extends Component {
  constructor(props) {
    super(props);
  }

  onValue(value) {
    this.props.onValue(this.props.name, value);
  }

  render() {
    const schema = colorSchema[this.props.name.toLowerCase()] || colorSchema.joy;
    return (
      <View style={sliderStyles.view}>
        <Text style={sliderStyles.label}>{this.props.name}</Text>
        <Slider
          style={sliderStyles.slider}
          minimumTrackTintColor={schema.left}
          maximumTrackTintColor={schema.right}
          thumbTintColor={schema.thumb}
          maximumValue={7}
          step={1}
          onSlidingComplete={this.onValue.bind(this)}/>
      </View>
    )
  }
}

export default AbsoluteMoodSlider;
