import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import Styles from '../styles/main.js';

class Main extends Component {
  static navigationOptions = {
    title: 'Home',
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={Styles.content}>
        <Text>Welcome!</Text>
        <Button
          onPress={() => {navigate('NewEntryComponent')}}
          title="Make New Entry"
        />
      </View>
    );
  }
}

export default Main;
