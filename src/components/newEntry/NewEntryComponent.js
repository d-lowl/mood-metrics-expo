import React, { Component } from 'react';
import { View, Button, Picker } from 'react-native';
import Styles from '../../styles/main.js';
import AbsoluteMoodInput from './AbsoluteMoodInput.js';
import RelativeMoodInput from './RelativeMoodInput.js';
import moment from 'moment';

function isEmpty(obj) {
    return !obj || Object.keys(obj).length === 0;
}

class NewEntryComponent extends Component {
  constructor(props) {
    super(props);
    this.state = this.getPlainState();
    if(this.props.mood){
      this.state.currentMood = this.props.mood;
      this.state.mood = this.props.mood;
    }
  }

  getPlainState() {
    return {
      currentMood: null,
      mood: {
        anger: 0,
        disgust: 0,
        fear: 0,
        joy: 0,
        sadness: 0,
        surprise: 0
      }
    }
  }

  onStartOver() {
    this.setState(this.getPlainState());
  }

  onValue(value) {
    this.setState({
      currentMood: this.state.currentMood,
      mood: value
    });
  }

  getInput() {
    if(isEmpty(this.state.currentMood) || !moment(this.props.datetime).isSame(moment(),'day')){
      return(<AbsoluteMoodInput
               onValue={this.onValue.bind(this)}/>)
    }
    else {
      return(<RelativeMoodInput
               mood={this.state.currentMood}
               onValue={this.onValue.bind(this)}
               onStartOver={this.onStartOver.bind(this)}/>)
    }
  }

  render() {
    return (
      <View style={Styles.content}>
        {this.getInput()}
        <Button
          onPress={() => {
            this.props.newEntry(this.state.mood);
          }}
          title="Submit"
        />
      </View>
    )
  }
}

export default NewEntryComponent;
