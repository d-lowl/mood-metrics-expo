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

  getComponents() {
    if(this.state.isCalendar)
    {
      console.log(new Date(this.state.range.to.toISOString()));
      return (
        <CalendarPicker
          initialDate={new Date(this.state.range.from.toISOString())}
          startFromMonday={true}
          allowRangeSelection={false}
          onDateChange={(date, type) => {
            this.setState({
              range: getRangeFromDate(date),
              isCalendar: !this.state.isCalendar
            });
          }}
        />
      );
    }
    else
      return(
        <ViewQueryGraph
          from={this.state.range.from.toISOString()}
          to={this.state.range.to.toISOString()}
          user={this.props.auth.id}/>
      );
  }

  render() {
    return (
      <StyledContainer>
        <Content>
          <View style={localStyle().navigator}>
            <Button small
              onPress={() => {this.setState({isCalendar: !this.state.isCalendar})}}>
              <Text>{this.state.range.from.format("Do MMM YYYY")}</Text>
            </Button>
          </View>
          {this.getComponents()}
        </Content>
      </StyledContainer>
    );
  }
}

const mapStateToProps = ({ entry, auth }) => ({ entry, auth })


export default connect(mapStateToProps)(ViewEntriesContainer);
