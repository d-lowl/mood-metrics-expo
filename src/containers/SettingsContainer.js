import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import { CheckBox, Body, Text, Container, Header, Content, ListItem } from 'native-base';

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
    // console.log(val);x
    const isRelative = !(this.state.isRelative);
    AsyncStorage.setItem('settings:is_relative',isRelative.toString());
    this.setState({isRelative});
  }

  render() {
    const isRelative = this.state.isRelative;
    return (
      <Container>
        <Content>
          <ListItem>
            <CheckBox
              checked={isRelative}
              onPress={this.toggleRelativeMode.bind(this)}
            />
            <Body>
              <Text>Relative Input Mode</Text>
            </Body>
          </ListItem>
        </Content>
      </Container>
    );
  }
}

export default SettingsContainer;
