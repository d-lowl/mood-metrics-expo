import React, { Component } from 'react';
import { View } from 'react-native';
import { Text } from 'native-base';
import colorSchema from '../../styles/colorSchema.js';
import { capitalise } from '../../utils/StringHelper.js';

const radius = 9;

const localStyle = (name) => {
  name = name || "anger";
  const style = {
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      alignSelf: 'center',
      margin: radius/2
    },
    circle: {
      backgroundColor: colorSchema[name].thumb,
      width: radius * 2,
      height: radius * 2,
      borderRadius: radius,
      marginRight: radius
    },
    text: {
      minWidth: 70
    },
    quantity: {

    }
  }

  return style;
}

class LegendBadge extends Component {

  render() {
    let text = capitalise(this.props.name);
    let quantity = (this.props.quantity ? " "+this.props.quantity+"/7" : "");

    return(
      <View style={localStyle().container}>
        <View style={localStyle(this.props.name).circle}/>
        <Text style={localStyle().text}>{text}</Text>
        <Text style={localStyle().quantity}>{quantity}</Text>
      </View>
    )
  }
}

export default LegendBadge;
