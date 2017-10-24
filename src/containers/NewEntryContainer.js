import React, { Component } from 'react';
import { connect } from 'react-redux'
import { graphql } from 'react-apollo';
import NewEntryComponent from '../components/newEntry/NewEntryComponent.js'
import { store } from '../Store';
import { setState, newEntry } from '../actions';
import { newEntryMutation, queryMoodEntriesInRange } from '../utils/GraphQL.js';
import moment from 'moment';

class NewEntryContainer extends Component {
  static navigationOptions = {
    title: 'New Entry',
  }

  newEntryHandler(mood) {
    store.dispatch(newEntry(null,mood));
    this.props.mutate({
      variables: { ...mood, user: this.props.auth.id },
      refetchQueries: [{
        query: queryMoodEntriesInRange,
        variables: {
          from: moment(0,"HH").toISOString(),
          to: moment(0,"HH").add(1,'days').toISOString()
        }
      }]
    });
    this.props.navigation.goBack();
  }

  render() {
    return (
      <NewEntryComponent
        mood={this.props.entry.mood}
        newEntry={this.newEntryHandler.bind(this)}/>
    );
  }
}

const mapStateToProps = ({ entry, auth }) => ({ entry, auth })

export default connect(mapStateToProps)(graphql(newEntryMutation)(NewEntryContainer));
