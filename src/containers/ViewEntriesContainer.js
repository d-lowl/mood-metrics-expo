import React, { Component } from 'react';
import { View } from 'react-native';
import { Text, Button, Content } from 'native-base';
import CalendarPicker from 'react-native-calendar-picker';
import { connect } from 'react-redux';
import { graphql } from 'react-apollo';
import Styles from '../styles/main.js';
import ViewQueryGraph from '../components/viewEntries/ViewQueryGraph.js';
import StyledContainer from '../components/common/StyledContainer';
import { getToday, getOneDayRange, getRangeFromDate } from '../utils/DateTimeHelper.js';

const localStyle = () => {
  const style = {
    navigator: {
      // backgroundColor: 'lime',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center'
    },
    navigationButtons: {
      // backgroundColor: 'lime',
      marginHorizontal: 10
    }
  }

  return style;
}

class ViewEntriesContainer extends Component {
  static navigationOptions = {
    title: 'View Entries',
  }

  constructor(props) {
    super(props);
    this.state = {
      isCalendar: false,
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

  getCalendar() {
    if(this.state.isCalendar)
      return (
        <CalendarPicker
          startFromMonday={true}
          allowRangeSelection={false}
          onDateChange={(date, type) => {
            console.log("DATE: "+date);
            console.log("TYPE: "+type);
            this.setState({range: getRangeFromDate(date)});
          }}
        />
      );
  }

  render() {
    return (
      <StyledContainer>
        <Content>
          {this.getCalendar()}
          <View style={localStyle().navigator}>
            <Button small
              onPress={() => {this.setState({isCalendar: !this.state.isCalendar})}}>
              <Text>{this.state.range.from.format("Do MMM YYYY")}</Text>
            </Button>
          </View>
          <ViewQueryGraph
            from={this.state.range.from.toISOString()}
            to={this.state.range.to.toISOString()}
            user={this.props.auth.id}/>
        </Content>
      </StyledContainer>
    );
  }
}

const mapStateToProps = ({ entry, auth }) => ({ entry, auth })


export default connect(mapStateToProps)(ViewEntriesContainer);
