import React, { Component } from 'react';
import { View, Text, Button, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import { graphql } from 'react-apollo';
import Styles from '../styles/main.js';
import NewEntryContainer from '../containers/NewEntryContainer.js';
import ViewEntriesContainer from '../containers/ViewEntriesContainer.js';
import uuidv4 from 'uuid/v4';
import { authenticationMutation, queryLastMoodEntry } from '../utils/GraphQL.js';
import { store, apolloClient } from '../Store';
import { onAuth, newEntry } from '../actions';

class Main extends Component {
  static navigationOptions = {
    title: 'Home',
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

  render() {
    if(!this.props.auth.id) {
      return(
        <View style={Styles.content}>
          <Text>Authenticating. Please wait.</Text>
        </View>
      )
    }

    const { navigate } = this.props.navigation;
    return (
      <View style={Styles.content}>
        <Text>Welcome!</Text>
        <Button
          onPress={() => {navigate('NewEntryContainer')}}
          title="Make New Entry"
        />
        <Button
          onPress={() => {navigate('ViewEntriesContainer')}}
          title="View Entries"
        />
        <Button
          onPress={() => {navigate('SettingsContainer')}}
          title="Settings"
        />
        <Text style={{position: 'absolute', bottom: 0}}>Version: {Expo.Constants.manifest.version}</Text>
      </View>
    );
  }
}

const mapStateToProps = ({auth}) => ({auth})

export default graphql(authenticationMutation)(connect(mapStateToProps)(Main));
