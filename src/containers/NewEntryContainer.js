import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import { connect } from 'react-redux'
import { graphql } from 'react-apollo';
import StyledContainer from '../components/common/StyledContainer';
import FullScreenContent from '../components/common/FullScreenContent';
import NewEntryComponent from '../components/newEntry/NewEntryComponent.js'
import { store } from '../Store';
import { setState, newEntry } from '../actions';
import { newEntryMutation, queryMoodEntriesInRange } from '../utils/GraphQL.js';
import { submitAnalytics, getSubmitEntryPayload, analyticsTypes } from '../utils/AnalyticsHelper.js';
import moment from 'moment';

class NewEntryContainer extends Component {
  static navigationOptions = {
    title: 'New Entry',
  }

  constructor(props) {
    super(props);
    this.state = {}
  }

  newEntryHandler(mood, inRelativeMode, withRelativeValue) {
    store.dispatch(newEntry(moment().toISOString(),mood));
    this.props.mutate({
      variables: { ...mood, user: this.props.auth.id, inRelativeMode, withRelativeValue},
      refetchQueries: [{
        query: queryMoodEntriesInRange,
        variables: {
          from: moment(0,"HH").toISOString(),
          to: moment(0,"HH").add(1,'days').toISOString(),
          user: this.props.auth.id
        }
      }]
    });
    submitAnalytics(analyticsTypes.SUBMIT_ENTRY,getSubmitEntryPayload(inRelativeMode,withRelativeValue))
    this.props.navigation.goBack();
  }



  async componentDidMount() {
    const inRelativeMode = (await AsyncStorage.getItem('settings:is_relative') === "true" || false);
    this.setState({
      inRelativeMode
    })
  }

  render() {
    return (
      <StyledContainer>
        <FullScreenContent fullWidth>
          <NewEntryComponent
            inRelativeMode={this.state.inRelativeMode}
            datetime={this.props.entry.datetime}
            mood={this.props.entry.mood}
            newEntry={this.newEntryHandler.bind(this)}/>
        </FullScreenContent>
      </StyledContainer>
    );
  }
}

const mapStateToProps = ({ entry, auth }) => ({ entry, auth })

export default connect(mapStateToProps)(graphql(newEntryMutation)(NewEntryContainer));
