import React, { Component } from 'react';
import { AsyncStorage, Dimensions, Clipboard } from 'react-native';
import { CheckBox, Text, Content, ListItem, Button, Toast } from 'native-base';
import StyledContainer from '../components/common/StyledContainer';
import { getGeekData } from '../utils/AnalyticsHelper.js';

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

  copyGeekData = async () => {
    await Clipboard.setString(await getGeekData());
    console.log(await Clipboard.getString());
    Toast.show({
      text: "Geek data copied to clipboard. Do not share them publicly!",
      type: "success",
      duration: 2000
    })
  }

  render() {
    const isRelative = this.state.isRelative;
    return (
      <StyledContainer>
        <Content scrollEnabled={false} style={localStyle().content}>
          <ListItem style={localStyle().listItem}>
            <Text>Relative Input Mode</Text>
            <CheckBox
              checked={isRelative}
              onPress={this.toggleRelativeMode.bind(this)}
            />
          </ListItem>
          <ListItem style={localStyle().listItem}>
            <Text>Geek Data</Text>
            <Button small bordered onPress={this.copyGeekData}><Text>Copy to clipboard</Text></Button>
          </ListItem>
        </Content>
      </StyledContainer>
    );
  }
}

export default SettingsContainer;
