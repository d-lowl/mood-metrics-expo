import Expo from "expo";
import React from "react";
import { Provider } from 'react-redux';
import { ApolloProvider } from 'react-apollo';

import { store, apolloClient } from './src/Store';
import BaseNavigation from './src/Router';

const App = () => (
  <ApolloProvider store={store} client={apolloClient}>
    <BaseNavigation />
  </ApolloProvider>
);

class App1 extends React.Component {
  constructor() {
    super();
    this.state = {
      isReady: false
    };
  }

  async componentWillMount() {
    await Expo.Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf")
    });

    this.setState({ isReady: true });
  }
  render() {
    if (!this.state.isReady) {
      return <Expo.AppLoading />;
    }
    return <App />;
  }
}


export default App1;
