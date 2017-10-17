import React, { Component } from 'react';
import { connect } from 'react-redux'
import NewEntryComponent from '../components/newEntry/NewEntryComponent.js'
import store from '../Store';
import { setState, newEntry } from '../actions';

class NewEntryContainer extends Component {
  static navigationOptions = {
    title: 'New Entry',
  }

  newEntryHandler(mood) {
    store.dispatch(newEntry(null,mood));
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

export default connect(mapStateToProps)(NewEntryContainer);
