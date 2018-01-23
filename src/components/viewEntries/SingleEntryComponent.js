import React, { Component } from 'react';
import { Text } from 'native-base';
import { StockLine } from 'react-native-pathjs-charts';
import colorSchema, { getPallete } from '../../styles/colorSchema.js';
import LegendBadge from './LegendBadge.js';
import { ScrollView, Dimensions, View } from 'react-native';
import moment from 'moment';

const MIN_RESOLUTION = 5.0/60.0// 5 minutes
const UNIT_WIDTH = 25.0;
const MINIMUM_WIDTH_RATE = 0.8;

const localStyle = (name) => {
  name = name || "anger";
  const style = {
    badge: {
      backgroundColor: colorSchema[name].thumb,
      minWidth: 100,
      margin: 5
    },
    half: {
      flex: 1,
    }
  }

  return style;
}

class SingleEntryComponent extends Component {

  constructBadges() {
    let dataSet = this.props.dataSet;
    var badges = [];

    if(dataSet.anger !== 0)
      badges.push(<LegendBadge name="anger" key="b_anger" quantity={dataSet.anger}/>);

    if(dataSet.disgust !== 0)
      badges.push(<LegendBadge name="disgust" key="b_disgust" quantity={dataSet.disgust}/>);

    if(dataSet.fear !== 0)
      badges.push(<LegendBadge name="fear" key="b_fear" quantity={dataSet.fear}/>);

    if(dataSet.joy !== 0)
      badges.push(<LegendBadge name="joy" key="b_joy" quantity={dataSet.joy}/>);

    if(dataSet.sadness !== 0)
      badges.push(<LegendBadge name="sadness" key="b_sadness" quantity={dataSet.sadness}/>);

    if(dataSet.surprise !== 0)
      badges.push(<LegendBadge name="surprise" key="b_surprise" quantity={dataSet.surprise}/>);

    return badges;
  }

  render() {
    let dataSet = this.props.dataSet
    console.log(dataSet);
    let time = moment(dataSet.createdAt).format('LT');

    return(
      <View style={{alignSelf: 'center'}}>
        <Text note>Not enough entries for a graph</Text>
        <Text>Last entry at {time}</Text>
        {this.constructBadges()}
      </View>
    )
  }
}

export default SingleEntryComponent;
