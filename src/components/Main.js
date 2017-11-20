import React, { Component } from 'react';
import { View, AsyncStorage } from 'react-native';
import { Container, Content, Button, Text, StyleProvider } from 'native-base';

import FullScreenContent from './common/FullScreenContent';
import LoadingSpinner from './common/LoadingSpinner';
import StyledContainer from './common/StyledContainer';

import { connect } from 'react-redux';
import { graphql } from 'react-apollo';
import NewEntryContainer from '../containers/NewEntryContainer.js';
import ViewEntriesContainer from '../containers/ViewEntriesContainer.js';
import uuidv4 from 'uuid/v4';
import { authenticationMutation, queryLastMoodEntry } from '../utils/GraphQL.js';
import { store, apolloClient } from '../Store';
import { onAuth, newEntry } from '../actions';

class Main extends Component {
  static navigationOptions = {
    title: 'Mood Tracker',
  }

  async tryAuthentication() {
    try
    {
      var secret = await AsyncStorage.getItem("auth:secret");
      if(!secret){
        console.log("Generating new UUID");
        secret = uuidv4();
        await AsyncStorage.setItem("auth:secret",secret);
      }

      var mutation = await this.props.mutate({ variables: { secret } });
      await AsyncStorage.setItem("auth:token",mutation.data.authenticateAnonymousUser.token);
      apolloClient.resetStore();

      var lastEntry = (await apolloClient.query({
        query: queryLastMoodEntry,
        variables: {
          user: mutation.data.authenticateAnonymousUser.id
        }
      })).data.User.moodEntries;
      if(lastEntry.length === 1){
        store.dispatch(newEntry(
          lastEntry[0].createdAt,
          {
            anger: lastEntry[0].anger,
            disgust: lastEntry[0].disgust,
            fear: lastEntry[0].fear,
            joy: lastEntry[0].joy,
            sadness: lastEntry[0].sadness,
            surprise: lastEntry[0].surprise
          }
        ))
      }

      store.dispatch(onAuth(mutation.data.authenticateAnonymousUser.id));
    }
    catch(err){
      console.log("Something went wrong during authentication: "+err);
    }
  }

  componentDidMount(){
    if(!this.props.auth.id) {
      this.tryAuthentication();
    }
  }

  getContent() {
    if(!this.props.auth.id) {
      return(
        <LoadingSpinner>
          <Text>Authenticating. Please wait.</Text>
        </LoadingSpinner>
      )
    } else {
      const { navigate } = this.props.navigation;
      return(
        <View>
          <Button
            onPress={() => {navigate('NewEntryContainer')}}>
              <Text>Make New Entry</Text>
          </Button>
          <Button
            onPress={() => {navigate('ViewEntriesContainer')}}>
              <Text>View Entries</Text>
          </Button>
          <Button
            onPress={() => {navigate('SettingsContainer')}}>
              <Text>Settings</Text>
          </Button>
        </View>
      )
    }
  }

  render() {
    return (
      <StyledContainer>
        <FullScreenContent>
          {this.getContent()}
          <Text style={{position: 'absolute', bottom: 0}}>Version: {Expo.Constants.manifest.version}</Text>
        </FullScreenContent>
      </StyledContainer>
    );
  }
}

const mapStateToProps = ({auth}) => ({auth})

export default graphql(authenticationMutation)(connect(mapStateToProps)(Main));
