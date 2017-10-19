import React, { Component } from 'react';
import { View, Button, Text } from 'react-native';
import sliderStyles from '../../styles/sliders.js';

class SliderHeader extends Component {
  render() {
    var labels = [];

    for(var v in this.props.labels)
    {
        labels.push(
          <Text key={v}>{this.props.labels[v]}</Text>
        );
    }

    return(
      <View style={{flexDirection: 'row'}}>
        <View style={sliderStyles.label}/>
        <View style={[sliderStyles.slider, {flexDirection: 'row', justifyContent: 'space-between', marginLeft: 10, marginRight: 6, marginTop: 10}]}>
          {labels}
        </View>
      </View>
    )
  }
}

export default SliderHeader
