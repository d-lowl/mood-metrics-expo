import React, { Component } from 'react';
import { View } from 'react-native';
import { Text, Button, Content } from 'native-base';
import { connect } from 'react-redux';
import { graphql } from 'react-apollo';
import Styles from '../styles/main.js';
import ViewQueryGraph from '../components/viewEntries/ViewQueryGraph.js';
import StyledContainer from '../components/common/StyledContainer';
import { getToday, getOneDayRange } from '../utils/DateTimeHelper.js';

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

  render() {
    return (
      <StyledContainer>
        <Content>
          <View style={localStyle().navigator}>
            <Button style={localStyle().navigationButtons}
              onPress={this.oneDayBack.bind(this)} small transparent bordered>
                <Text>{"<"}</Text>
            </Button>
            <Text>{this.state.range.from.format("Do MMM YYYY")}</Text>
            <Button style={localStyle().navigationButtons}
              onPress={this.oneDayForward.bind(this)} small transparent bordered>
                <Text>{">"}</Text>
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
