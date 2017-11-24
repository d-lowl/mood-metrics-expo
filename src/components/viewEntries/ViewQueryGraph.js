import React, { Component } from 'react';
import { ScrollView, Text } from 'react-native';
import { graphql } from 'react-apollo';
import { getPallete } from '../../styles/colorSchema.js';
import { StockLine } from 'react-native-pathjs-charts';
import { queryMoodEntriesInRange } from '../../utils/GraphQL.js';

class ViewQueryGraph extends Component {

  getFloatHours(datetime) {
    return datetime.getHours() + datetime.getMinutes() / 60.0;
  }

  meaningfulDistance(mean, minDelta, duration) {
    return (minDelta < 0.1 ? 0.1 : minDelta);
  }

  makeDataSet() {
    if(this.props.data.loading || this.props.data.User.moodEntries.length === 0)
      return null;

    var data = [[],[],[],[],[],[]];

    var entries = this.props.data.User.moodEntries;

    var max = NaN, min = NaN;
    var previous = NaN, minDelta = NaN;
    for (var v in entries) {
      let date = this.getFloatHours(new Date(entries[v].createdAt));
      let delta = date - previous;
      minDelta = delta > minDelta ? minDelta : delta;
      max = date < max ? max : date;
      min = date > min ? min : date;
      previous = date;

      data[0].push({
        "time": date,
        "value": entries[v].anger
      })
      data[1].push({
        "time": date,
        "value": entries[v].disgust
      })
      data[2].push({
        "time": date,
        "value": entries[v].fear
      })
      data[3].push({
        "time": date,
        "value": entries[v].joy
      })
      data[4].push({
        "time": date,
        "value": entries[v].sadness
      })
      data[5].push({
        "time": date,
        "value": entries[v].surprise
      })
    }

    return {
      data,
      count: Math.ceil(max - min),
      mean: (max - min) / (entries.length - 1),
      minDelta
    };
  }

  render() {
    if(this.props.data.loading) {
      return (
        <Text>Loading...</Text>
      )
    }

    let dataSet = this.makeDataSet();

    if(!dataSet) {
      return(
        <Text>Empty</Text>
      )
    }

    let md = this.meaningfulDistance(dataSet.mean, dataSet.minDelta, dataSet.count)
    console.log(md);

    let options = {
      width:25*dataSet.count/md,
      height: 250,
      color: '#000000',
      strokeWidth: 2,
      margin: {
        top: 10,
        left: 35,
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
        tickCount: Math.ceil(0.5*dataSet.count/md),
        labelFunction: ((v) => {
          let h = Math.floor(v);
          let m = Math.round((v - h) * 60)
          return ""+h+(m > 10 ? ":" : ":0")+m;
        }),
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
    )
  }
}

export default graphql(queryMoodEntriesInRange)(ViewQueryGraph);
