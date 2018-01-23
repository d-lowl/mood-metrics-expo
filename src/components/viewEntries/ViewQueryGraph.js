import React, { Component } from 'react';
import { Text } from 'native-base';
import { graphql } from 'react-apollo';
import { queryMoodEntriesInRange } from '../../utils/GraphQL.js';
import ViewQueryGraphComponent from './ViewQueryGraphComponent.js';
import SingleEntryComponent from './SingleEntryComponent.js';
import { prepareDataSet } from '../../utils/DataSetHelper.js';

class ViewQueryGraph extends Component {

  makeDataSet() {
    if(this.props.data.loading || this.props.data.User.moodEntries.length === 0)
      return null;

    return prepareDataSet(this.props.data.User.moodEntries);
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

    if(this.props.data.User.moodEntries.length === 1){
      return(
        <SingleEntryComponent dataSet={this.props.data.User.moodEntries[0]} />
      )
    }

    return(
      <ViewQueryGraphComponent dataSet={dataSet} />
    )
  }
}

export default graphql(queryMoodEntriesInRange)(ViewQueryGraph);
