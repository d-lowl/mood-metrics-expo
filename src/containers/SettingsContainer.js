import React, { Component } from 'react';
import { AsyncStorage, Dimensions } from 'react-native';
import { CheckBox, Body, Text, Container, Header, Content, ListItem } from 'native-base';
import StyledContainer from '../components/common/StyledContainer';

const localStyle = () => {
  const {width: screenWidth} = Dimensions.get('window');
  const style = {
    content: {
      width: screenWidth
    },
    listItem: {
      justifyContent: 'space-between',
      marginLeft: 0,
      paddingLeft: 10
    }
  }


  return style;
}

class SettingsContainer extends Component {
  static navigationOptions = {
    title: 'Settings',
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentWillMount() {
    const isRelative = (await AsyncStorage.getItem('settings:is_relative') === "true" || false);
    this.setState({
      isRelative
    })
  }

  toggleRelativeMode() {
    const isRelative = !(this.state.isRelative);
    AsyncStorage.setItem('settings:is_relative',isRelative.toString());
    this.setState({isRelative});
  }

  render() {
    const isRelative = this.state.isRelative;
    return (
      <StyledContainer>
        <Content  style={localStyle().content}>
          <ListItem style={localStyle().listItem}>
            <Text>Relative Input Mode</Text>
            <CheckBox
              checked={isRelative}
              onPress={this.toggleRelativeMode.bind(this)}
            />
          </ListItem>
        </Content>
      </StyledContainer>
    );
  }
}

export default SettingsContainer;
