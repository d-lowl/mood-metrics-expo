import React, { Component } from 'react';
import { View, Dimensions } from 'react-native';
import { Content } from 'native-base';


class FullScreenContent extends Component {
  render() {
    const {height: screenHeight} = Dimensions.get('window');
    //TODO Screen height fix for android and iOS
    return (
      <Content scrollEnabled={false}>
        <View style={{flex: 1, height: screenHeight - 64, justifyContent: 'center', alignItems: 'center'}}>
          {this.props.children}
        </View>
      </Content>
    );
  }
}

export default FullScreenContent;
