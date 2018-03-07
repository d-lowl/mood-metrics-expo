import React, { Component } from 'react';
import { Text } from 'native-base';
import { StockLine } from 'react-native-pathjs-charts';
import colorSchema, { getPallete } from '../../styles/colorSchema.js';
import LegendBadge from './LegendBadge.js';
import { ScrollView, Dimensions, View } from 'react-native';
import { getFloatHours } from '../../utils/DataSetHelper.js';
import moment from 'moment';

const MIN_RESOLUTION = 5.0/60.0// 5 minutes
const MULTI_MIN_RESOLUTION = 86400.0;// 1 day
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

class ViewQueryGraphComponent extends Component {

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

    let md = this.getResolution(dataSet.minDelta, dataSet.count)

    let options = {
      max: 7,
      width: this.getWidth(dataSet.count,md),
      height: 250,
      color: '#000000',
      strokeWidth: 2,
      margin: {
        top: 10,
        left: 10,
        bottom: 30,
        right: 10
      },
      animate: {
        type: 'delayed',
        duration: 200
      },
      axisX: {
        showAxis: true,
        showLines: true,
        showLabels: true,
        showTicks: true,
        zeroAxis: false,
        orient: 'bottom',
        tickValues: [],
        tickCount: Math.ceil(1.0*dataSet.count/md),
        labelFunction: this.getLabelFunction(),
        label: {
          fontFamily: 'Arial',
          fontSize: 8,
          fontWeight: true,
          fill: '#34495E'
        }
      },
      axisY: {
        showAxis: true,
        showLines: true,
        showLabels: true,
        showTicks: true,
        zeroAxis: false,
        orient: 'left',
        tickValues: [],
        label: {
          fontFamily: 'Arial',
          fontSize: 8,
          fontWeight: true,
          fill: '#34495E'
        }
      }
    }

    return(
      <View>
        <ScrollView
          style={{height: 300, flex: 0}}
          horizontal={true}>
          <StockLine
            data={dataSet.data}
            options={options}
            pallete={getPallete()}
            xKey='time'
            yKey='value' />
        </ScrollView>
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

export default ViewQueryGraphComponent;
