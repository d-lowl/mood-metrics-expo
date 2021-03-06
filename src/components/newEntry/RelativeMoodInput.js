import React, { Component } from 'react';
import { View } from 'react-native';
import { Text, Button } from 'native-base';
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

    // const ks = [0, 0.1, 0.35, 0.9];
    const ks = [0, 0.123939, 0.301030, 0.602060];

    for (var v in this.state.currentMood) {

      var d = ks[Math.abs(this.state.delta[v])] * Math.sign(this.state.delta[v]);
      if(this.state.delta[v] > 0) {
        d *= (7 - this.state.currentMood[v]);
      }
      else {
        d *= this.state.currentMood[v];
      }
      mood[v] = this.state.currentMood[v] + d;
      // console.log(mood[v] + ' < ' + this.state.currentMood[v] + ', ' + this.state.delta[v]);
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
        </View>
      </View>
    )
  }
}

export default RelativeMoodInput;
