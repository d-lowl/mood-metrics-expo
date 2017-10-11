import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import { connect } from 'react-redux'
import Styles from '../styles/main.js';

class ViewEntriesContainer extends Component {
  static navigationOptions = {
    title: 'New Entry',
  }

  render() {
    console.log(this.props.entry);
    return (
      <View style={Styles.content}>
        <Text>Last Entry: {JSON.stringify(this.props.entry)}</Text>
      </View>
    );
  }
}

const mapStateToProps = ({entry}) => ({entry})

export default connect(mapStateToProps)(ViewEntriesContainer);
