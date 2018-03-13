import React, { Component } from 'react';
import { View } from 'react-native';
import { Text, Button, Content, Segment } from 'native-base';
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
      range: getOneDayRange(getToday()),
      graphType: 'pie'
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
          allowRangeSelection={true}
          onDateChange={(date, type) => {
            if(type == "START_DATE") {
              this.setState({
                from: date,
                range: getRangeFromDate(date),
                isMultiDay: false
              });
            } else {
              this.setState({
                from: date,
                range: getRangeFromDate(this.state.from,date),
                isMultiDay: true
              });
            }
          }}
        />
      );
    }
    else
      return(
        <ViewQueryGraph
          isMultiDay={this.state.isMultiDay}
          graphType={this.state.graphType}
          from={this.state.range.from.toISOString()}
          to={this.state.range.to.toISOString()}
          user={this.props.auth.id}/>
      );
  }

  render() {

    var dateLabel = this.state.isMultiDay ? (this.state.range.from.format("Do MMM YYYY") + " - " + this.state.range.to.clone().subtract(1, 'days').format("Do MMM YYYY")) : this.state.range.from.format("Do MMM YYYY");
    var beforeSegment = (
      <Segment>
        <Button first active={this.state.graphType === 'line'}
          onPress={() => {this.setState({graphType: 'line'})}}>
          <Text>Line Chart</Text>
        </Button>
        <Button active={this.state.graphType === 'pie'}
          onPress={() => {this.setState({graphType: 'pie'})}}>
          <Text>Pie Chart</Text>
        </Button>
      </Segment>
    );

    return (
      <StyledContainer before={beforeSegment}>
        <Content>
          <View style={localStyle().navigator}>
            <Button small
              onPress={() => {this.setState({isCalendar: !this.state.isCalendar})}}>
              <Text>{dateLabel}</Text>
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
