import React, { Component } from 'react';
import { View } from 'react-native';
import { StyleProvider, Container } from 'native-base';

import getTheme from '../../../native-base-theme/components';
import material from '../../../native-base-theme/variables/material';
import platform from '../../../native-base-theme/variables/platform';
import commonColor from '../../../native-base-theme/variables/commonColor';
import Styles from '../../styles/main.js';

class StyledContainer extends Component {
  render() {
    return (
      <StyleProvider style={getTheme(material)}>
        <Container>
          {this.props.before}
          <Container style={Styles.content}>
            {this.props.children}
          </Container>
        </Container>
      </StyleProvider>
    );
  }
}

export default StyledContainer;
