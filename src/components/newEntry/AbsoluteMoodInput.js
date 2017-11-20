import React, { Component } from 'react';
import { View, Text } from 'native-base';
import { Grid, Col, Row } from 'react-native-easy-grid';
import styles from '../../styles/main.js';
import sliderStyles from '../../styles/sliders.js';
import AbsoluteMoodSlider from './AbsoluteMoodSlider.js';
import SliderHeader from './SliderHeader.js';

const localStyle = () => {
  const style = {
    top: {
    },
  }

  return style;
}

class AbsoluteMoodInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anger: 0,
      disgust: 0,
      fear: 0,
      joy: 0,
      sadness: 0,
      surprise: 0
    }
  }


  onValue(mood, value) {
    this.setState((state) => {
      state[mood.toLowerCase()] = value
      return state;
    }, () => {
      // console.log(this.state);
      this.props.onValue(this.state);
    })
  }

  render() {
    return (
      <View style={[{flexDirection: 'row'},localStyle().top]}>
        <View style={{flex: 1, alignItems: 'center'}}>
          <Text>What do you feel now?</Text>
          <SliderHeader labels={[0,1,2,3,4,5,6,7]}/>
          <AbsoluteMoodSlider name="Anger" onValue={this.onValue.bind(this)}/>
          <AbsoluteMoodSlider name="Disgust" onValue={this.onValue.bind(this)}/>
          <AbsoluteMoodSlider name="Fear" onValue={this.onValue.bind(this)}/>
          <AbsoluteMoodSlider name="Joy" onValue={this.onValue.bind(this)}/>
          <AbsoluteMoodSlider name="Sadness" onValue={this.onValue.bind(this)}/>
          <AbsoluteMoodSlider name="Surprise" onValue={this.onValue.bind(this)}/>
        </View>
      </View>
    )
  }
}

export default AbsoluteMoodInput;
