import React, { Component } from 'react';
import { View, Text, Button, Picker } from 'react-native';
import Styles from '../../styles/main.js';
import AbsoluteMoodInput from './AbsoluteMoodInput.js';

class NewEntryComponent extends Component {
  constructor(props) {
    super(props);
  }

  onValue(value) {
    this.setState(value);
  }

  render() {
    console.log(this.props.navigation);
    return (
      <View style={Styles.content}>
        <Text>New Entry</Text>
        <AbsoluteMoodInput onValue={this.onValue.bind(this)}/>
        <Button
          onPress={() => {
            this.props.newEntry(this.state);
          }}
          title="Submit"
        />
      </View>
    )
  }
}

export default NewEntryComponent;
