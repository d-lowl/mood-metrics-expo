import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import { connect } from 'react-redux';
import { gql, graphql } from 'react-apollo';
import moment from 'moment';
import Styles from '../styles/main.js';
import ViewQueryGraph from '../components/viewEntries/ViewQueryGraph.js';

class ViewEntriesContainer extends Component {
  static navigationOptions = {
    title: 'View Entries',
  }



  render() {
    let today = moment(0,"HH");
    return (
      <View style={Styles.content}>
        <Text>Last Entry: {JSON.stringify(this.props.entry)}</Text>
        <ViewQueryGraph
          from={today.toISOString()}
          to={today.add(1,'days').toISOString()}/>
      </View>
    );
  }
}

const mapStateToProps = ({entry}) => ({entry})


export default connect(mapStateToProps)(ViewEntriesContainer);
