import React, { Component } from 'react';
import { View } from 'react-native';
import { Button, Text } from 'native-base';
import Styles from '../../styles/main.js';
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
    return this.props.inRelativeMode && !isEmpty(this.state.currentMood) && moment(this.props.datetime).isSame(moment(),'day');
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
      return <Text>Loading...</Text>
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
