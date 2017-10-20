import React, { Component } from 'react';
import { connect } from 'react-redux'
import { gql, graphql } from 'react-apollo';
import NewEntryComponent from '../components/newEntry/NewEntryComponent.js'
import { store } from '../Store';
import { setState, newEntry } from '../actions';

class NewEntryContainer extends Component {
  static navigationOptions = {
    title: 'New Entry',
  }

  newEntryHandler(mood) {
    store.dispatch(newEntry(null,mood));
    this.props.mutate({variables: mood});
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

const mapStateToProps = ({entry}) => ({entry})

const newEntryMutation = gql`
  mutation ($anger: Float!,
            $disgust: Float!,
            $fear: Float!,
            $joy: Float!,
            $sadness: Float!,
            $surprise: Float!) {
    createMoodEntry(
      anger: $anger
      disgust: $disgust
      fear: $fear
      joy: $joy
      sadness: $sadness
      surprise: $surprise
    ) {
      id
    }
  }
`;

export default connect(mapStateToProps)(graphql(newEntryMutation)(NewEntryContainer));
