import React, { Component } from 'react';
import { View, Text, Button, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { gql, graphql } from 'react-apollo';
import Styles from '../styles/main.js';
import { getPallete } from '../styles/colorSchema.js';
import { StockLine } from 'react-native-pathjs-charts';

class ViewEntriesContainer extends Component {
  static navigationOptions = {
    title: 'View Entries',
  }

  sumEntries(a,b) {
    return {
      anger: a.anger + b.anger,
      disgust: a.disgust + b.disgust,
      fear: a.fear + b.fear,

      joy: a.joy + b.joy,
    }
  }

  getFloatHours(datetime) {
    return datetime.getHours() + datetime.getMinutes() / 60.0;
  }

  makeDataSet() {
    if(this.props.data.loading)
      return [];

    var data = [[],[],[],[],[],[]];

    var entries = this.props.data.allMoodEntries;

    var max = NaN, min = NaN;

    for (var v in entries) {
      let date = this.getFloatHours(new Date(entries[v].createdAt));
      max = date < max ? max : date;
      min = date > min ? min : date;
      // let time = date.getHours() + date.getMinutes()/60.0;
      // console.log(time);
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

    console.log(max+" "+min);
    return {
      data,
      count: Math.ceil(max - min)
    };
  }

  render() {
    let dataSet = this.makeDataSet();

    console.log("count "+dataSet.count);

    let options = {
      width: 160*dataSet.count,
      height: 250,
      color: '#000000',
      strokeWidth: 2,
      showPoints: true,
      showAreas: true,
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
        tickCount: dataSet.count,
        labelFunction: ((v) => {
          console.log(v)
          let h = Math.floor(v);
          let m = Math.round((v - h) * 60)
          return ""+h+":"+m;
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

    return (
      <View style={Styles.content}>
        <Text>Last Entry: {JSON.stringify(this.props.entry)}</Text>
        <ScrollView
          style={{height: 300}}
          horizontal={true}>
          <StockLine
            data={dataSet.data}
            options={options}
            pallete={getPallete()}
            xKey='time'
            yKey='value' />
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = ({entry}) => ({entry})

const queryAll = gql`
  query moodEntriesInRange(
    $date_l: DateTime!,
    $date_h: DateTime!
  ){
    allMoodEntries (
      filter: {
        createdAt_gt: $date_l,
        createdAt_lte: $date_h,
      },
      orderBy: createdAt_ASC
    ) {
      createdAt
      anger
      disgust
      fear
      joy
      sadness
      surprise
    }
  }
`;

export default connect(mapStateToProps)(
  graphql(
    queryAll,
    {
      options: {
        variables: {
          date_l: "2017-10-20",
          date_h: "2017-10-21"
        }
      }
    }
  )(ViewEntriesContainer)
);
