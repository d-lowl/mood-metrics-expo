import React, { Component } from 'react';
import { View } from 'react-native';
import { Button, Text } from 'native-base';
import Styles from '../../styles/main.js';
import LoadingSpinner from '../common/LoadingSpinner';
import AbsoluteMoodInput from './AbsoluteMoodInput.js';
import RelativeMoodInput from './RelativeMoodInput.js';
import { Grid, Col, Row } from 'react-native-easy-grid';
import moment from 'moment';

function isEmpty(obj) {
    return !obj || Object.keys(obj).length === 0;
}

const localStyle = () => {
  const style = {
    top: {
      alignSelf: 'stretch'
    },
    sliderRow: {
      justifyContent: 'center',
      paddingHorizontal: 10
    },
    button: {
      alignSelf: 'center'
    }
  }

  return style;
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

  isWithRelativeValue() {
    return this.props.inRelativeMode
        && !isEmpty(this.state.currentMood)
        && moment(this.props.datetime).isSame(moment(),'day')
        && (this.state.currentMood.anger != 0
         || this.state.currentMood.disgust != 0
         || this.state.currentMood.fear != 0
         || this.state.currentMood.joy != 0
         || this.state.currentMood.sadness != 0
         || this.state.currentMood.surprise != 0);
  }

  getInput() {
    if(!(this.isWithRelativeValue())){
      return(<AbsoluteMoodInput
               onValue={this.onValue.bind(this)}/>)
    }
    else {
      return(<RelativeMoodInput
               mood={this.state.currentMood}
               onValue={this.onValue.bind(this)}  />)
    }
  }

  getRelativeControls() {
    if(this.isWithRelativeValue()) {
      return (
        <Button bordered danger
          style={localStyle().button}
          onPress={this.onStartOver.bind(this)}
        >
          <Text>Start Over</Text>
        </Button>
      )
    }
  }

  render() {
    if(this.props.inRelativeMode === undefined){
      return <LoadingSpinner><Text>Loading...</Text></LoadingSpinner>
    }
    return (
      <View style={localStyle().top}>
        <View style={localStyle().sliderRow}>
          {this.getInput()}
        </View>
        <Button success
          onPress={() => {
            this.props.newEntry(this.state.mood,this.props.inRelativeMode,this.isWithRelativeValue());
          }}
          style={localStyle().button}
        >
          <Text>Submit</Text>
        </Button>
        {this.getRelativeControls()}
      </View>
    )
  }
}

export default NewEntryComponent;
