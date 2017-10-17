import React, { Component } from 'react';
import { View, Button } from 'react-native';
import styles from '../../styles/main.js';
import sliderStyles from '../../styles/sliders.js';
import RelativeMoodSlider from './RelativeMoodSlider.js';

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
      // console.log(this.state);
      this.props.onValue(this.constructMood());
    })
  }

  getSliders() {
    sliders = [];
    for (var v in this.state.currentMood) {
      if(this.state.currentMood[v] !== 0)
        sliders.push(<RelativeMoodSlider key={v} name={v} onValue={this.onValue.bind(this)}/>)
    }
    return sliders;
  }

  render() {
    return (
      <View style={{flexDirection: 'row'}}>
        <View style={{flex: 1}}>
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
