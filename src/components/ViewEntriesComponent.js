import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import { connect } from 'react-redux'
import Styles from '../styles/main.js';

class ViewEntriesComponent extends Component {
  static navigationOptions = {
    title: 'New Entry',
  }

  render() {
    return (
      <View style={Styles.content}>
        <Text>Last Entry: {this.props.simple.n}</Text>
      </View>
    );
  }
}

const mapStateToProps = ({simple}) => ({simple})

export default connect(mapStateToProps)(ViewEntriesComponent);
