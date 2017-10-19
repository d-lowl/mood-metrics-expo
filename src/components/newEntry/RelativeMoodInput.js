import React, { Component } from 'react';
import { View, Button, Text } from 'react-native';
import styles from '../../styles/main.js';
import sliderStyles from '../../styles/sliders.js';
import { capitalise } from '../../utils/StringHelper.js';
import RelativeMoodSlider from './RelativeMoodSlider.js';
import SliderHeader from './SliderHeader.js';

class RelativeMoodInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentMood: this.props.mood,
      delta: {
        anger: 0,
        disgust: 0,
        fear: 0,
        joy: 0,
        sadness: 0,
        surprise: 0
      }
    }
  }

  normaliseMood(mood) {
    for(var v in mood){
      if(mood[v] > 7)
        mood[v] = 7;
      else if (mood[v] < 0)
        mood[v] = 0;
    }
    return mood;
  }

  constructMood() {
    var mood = {};
    for (var v in this.state.currentMood) {
      mood[v] = this.state.currentMood[v] + this.state.delta[v];
    }

    return this.normaliseMood(mood);
  }

  onValue(mood, value) {
    this.setState((state) => {
      state.delta[mood.toLowerCase()] = value
      return state;
    }, () => {
      this.props.onValue(this.constructMood());
    })
  }

  getSliders() {
    sliders = [];
    for (var v in this.state.currentMood) {
      if(this.state.currentMood[v] !== 0)
        sliders.push(<RelativeMoodSlider key={v} name={capitalise(v)} onValue={this.onValue.bind(this)}/>)
    }
    return sliders;
  }

  render() {
    return (
      <View style={{flexDirection: 'row'}}>
        <View style={{flex: 1, alignItems: 'center'}}>
          <Text>How did your mood change?</Text>
          <SliderHeader labels={['-','=','+']}/>
          {this.getSliders()}
          <Button
            onPress={this.props.onStartOver}
            title="Start over"
          />
        </View>
      </View>
    )
  }
}

export default RelativeMoodInput;
