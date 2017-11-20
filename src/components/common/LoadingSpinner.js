import React, { Component } from 'react';
import { View } from 'react-native';
import { Spinner } from 'native-base';


class LoadingSpinner extends Component {
  render() {
    return (
      <View>
        {this.props.children}
        <Spinner />
      </View>
    );
  }
}

export default LoadingSpinner;
