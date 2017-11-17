import React, { Component } from 'react';
import { View } from 'react-native';
import { StyleProvider, Container } from 'native-base';

import getTheme from '../../../native-base-theme/components';
import material from '../../../native-base-theme/variables/material';
import Styles from '../../styles/main.js';

class LoadingSpinner extends Component {
  render() {
    return (
      <StyleProvider style={getTheme(material)}>
        <Container style={Styles.content}>
          {this.props.children}
        </Container>
      </StyleProvider>
    );
  }
}

export default LoadingSpinner;
