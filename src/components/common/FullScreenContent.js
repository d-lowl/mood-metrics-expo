import React, { Component } from 'react';
import { View, Dimensions } from 'react-native';
import { Content } from 'native-base';


class FullScreenContent extends Component {
  render() {
    const {height: screenHeight, width: screenWidth} = Dimensions.get('window');
    var style = {
      flex: 1,
      height: screenHeight - 64,
      justifyContent: 'center',
      alignItems: 'center'
    };
    if (this.props.fullWidth) {
      style = {
        ...style,
        width: screenWidth
      }
    }
    if (this.props.highlight) {
       style = {
         ...style,
         backgroundColor: 'lightgreen'
       }
    }

    //TODO Screen height fix for android and iOS
    return (
      <Content scrollEnabled={false}>
        <View style={style}>
          {this.props.children}
        </View>
      </Content>
    );
  }
}

export default FullScreenContent;
