import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import Styles from '../styles/main.js';
import NewEntryContainer from '../containers/NewEntryContainer.js';
import ViewEntriesContainer from '../containers/ViewEntriesContainer.js';

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
          onPress={() => {navigate('NewEntryContainer')}}
          title="Make New Entry"
        />
        <Button
          onPress={() => {navigate('ViewEntriesContainer')}}
          title="View Entries"
        />
      </View>
    );
  }
}

export default Main;
