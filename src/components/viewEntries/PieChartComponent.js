import React, { Component } from 'react';
import { Text } from 'native-base';
import { Pie } from 'react-native-pathjs-charts';
import colorSchema, { getPallete } from '../../styles/colorSchema.js';
import LegendBadge from './LegendBadge.js';
import { ScrollView, Dimensions, View } from 'react-native';
import { getFloatHours } from '../../utils/DataSetHelper.js';
import moment from 'moment';

const MIN_RESOLUTION = 5.0/60.0// 5 minutes
const MULTI_MIN_RESOLUTION = 86400.0;// 1 day
const UNIT_WIDTH = 25.0;
const MINIMUM_WIDTH_RATE = 1.0;

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

class PieChartComponent extends Component {

  getMinimumWidth() {
    const {width: screenWidth} = Dimensions.get('window');
    return screenWidth * MINIMUM_WIDTH_RATE;
  }

  getWidth(duration, resolution) {
    var width = UNIT_WIDTH*duration/resolution;
    return (width > this.getMinimumWidth() ? width : this.getMinimumWidth());
  }

  getResolution(minDelta, duration) {
    if(this.props.isMultiDay)
      return MULTI_MIN_RESOLUTION;

    var resolution = minDelta < MIN_RESOLUTION ? MIN_RESOLUTION : minDelta;
    return resolution;
  }

  getLabelFunction() {
    if(this.props.isMultiDay) {
      return ((v) => {
        return moment.unix(v).format("Do MMM YYYY");
      })
    } else {
      return ((v) => {
        let _v = getFloatHours(v)
        let h = Math.floor(_v);
        let m = Math.round((_v - h) * 60)
        return ""+h+(m < 10 ? ":0" : ":")+m;
      })
    }
  }

  render() {

    let dataSet = this.props.dataSet

    const {width: screenWidth} = Dimensions.get('window');
    let pieWidth = screenWidth*1;
    let margins = screenWidth*0;
    let r = screenWidth*0.16;
    let R = screenWidth*0.45;

    let options = {
      margin: {
        top: margins,
        left: margins,
        right: margins,
        bottom: margins
      },
      width: pieWidth,
      height: pieWidth,
      r: r,
      R: R,
      legendPosition: 'topLeft',
      animate: {
        type: 'oneByOne',
        duration: 200,
        fillTransition: 3
      },
      label: {
        color: '#404040'
      }
    }

    return(
      <View>
        <Pie
          pallete={getPallete(dataSet)}
          data={dataSet}
          options={options}
          accessorKey="value" />
        <Text style={{alignSelf: 'center'}}>Graph legend:</Text>
        <View style={{flexDirection: 'row'}}>
          <View style={localStyle().half}>
            <LegendBadge name="anger"/>
            <LegendBadge name="disgust"/>
            <LegendBadge name="fear"/>
          </View>
          <View style={localStyle().half}>
            <LegendBadge name="joy"/>
            <LegendBadge name="sadness"/>
            <LegendBadge name="surprise"/>
          </View>
        </View>
      </View>
    )
  }
}

export default PieChartComponent;
