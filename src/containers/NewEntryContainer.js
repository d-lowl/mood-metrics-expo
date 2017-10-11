import React, { Component } from 'react';
import { connect } from 'react-redux'
import NewEntryComponent from '../components/newEntry/NewEntryComponent.js'
import store from '../Store';
import { setState, newEntry } from '../actions';


function newEntryHandler(mood) {
  store.dispatch(newEntry(null,mood));
  this.props.navigation.goBack();
}

class NewEntryContainer extends Component {
  static navigationOptions = {
    title: 'New Entry',
  }

  render() {
    return (
      <NewEntryComponent
        newEntry={newEntryHandler}/>
    );
  }
}

export default connect()(NewEntryContainer);
