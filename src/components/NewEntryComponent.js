import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import { connect } from 'react-redux'
import Styles from '../styles/main.js';
import store from '../Store';
import { setState } from '../actions';

class NewEntryComponent extends Component {
  static navigationOptions = {
    title: 'New Entry',
  }

  render() {
    console.log(setState);
    return (
      <View style={Styles.content}>
        <Text>New Entry</Text>
        <Button
          onPress={() => {store.dispatch(setState(2))}}
          title="State"
        />
      </View>
    );
  }
}

export default connect()(NewEntryComponent);
