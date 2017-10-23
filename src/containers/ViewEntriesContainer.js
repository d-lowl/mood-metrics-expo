import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import { connect } from 'react-redux';
import { gql, graphql } from 'react-apollo';
import Styles from '../styles/main.js';
import ViewQueryGraph from '../components/viewEntries/ViewQueryGraph.js';
import { getToday, getOneDayRange } from '../utils/DateTimeHelper.js';

class ViewEntriesContainer extends Component {
  static navigationOptions = {
    title: 'View Entries',
  }

  constructor(props) {
    super(props);
    this.state = {
      range: getOneDayRange(getToday())
    };
  }

  oneDayBack() {
    this.setState({
      range: getOneDayRange(this.state.range.from.subtract(1,'days'))
    })
  }

  oneDayForward() {
    this.setState({
      range: getOneDayRange(this.state.range.from.add(1,'days'))
    })
  }

  render() {
    return (
      <View style={Styles.content}>
        <View style={{flexDirection: 'row',
                      flex: 0.2,
                      justifyContent: 'center'}}>
          <Button onPress={this.oneDayBack.bind(this)} title="<"/>
          <Text>{this.state.range.from.format("Do MMM YYYY")}</Text>
          <Button onPress={this.oneDayForward.bind(this)} title=">"/>
        </View>
        <ViewQueryGraph
          from={this.state.range.from.toISOString()}
          to={this.state.range.to.toISOString()}/>
      </View>
    );
  }
}

const mapStateToProps = ({entry}) => ({entry})


export default connect(mapStateToProps)(ViewEntriesContainer);
