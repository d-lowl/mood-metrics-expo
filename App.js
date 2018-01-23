import Expo from "expo";
import React from "react";
import { Provider } from 'react-redux';
import { ApolloProvider } from 'react-apollo';
import { submitAnalytics,
         analyticsTypes,
         getEnterScreenPayload,
         getOpenApplicationPayload } from './src/utils/AnalyticsHelper.js';
import { Root } from 'native-base';
import { store, apolloClient } from './src/Store';
import BaseNavigation from './src/Router';

class App extends React.Component {

  getCurrentRouteName (navigationState)  {
    if (!navigationState) {
      return null
    }
    const route = navigationState.routes[navigationState.index]
    // dive into nested navigators
    if (route.routes) {
      return this.getCurrentRouteName(route)
    }
    return route.routeName
  }

  componentDidMount() {
    submitAnalytics(analyticsTypes.OPEN_APPLICATION, getOpenApplicationPayload());
  }

  render() {
    // const tracker = new GoogleAnalyticsTracker("UA-110981334-1");

    return(
      <Root>
        <ApolloProvider store={store} client={apolloClient}>
          <BaseNavigation
            onNavigationStateChange={(prevState, currentState) => {
              const currentScreen = this.getCurrentRouteName(currentState)
              const prevScreen = this.getCurrentRouteName(prevState)

              console.log("Screens");
              console.log(currentScreen);
              console.log(prevScreen);
              if (prevScreen !== currentScreen) {
                console.log("Submit:"+currentScreen);
                submitAnalytics(analyticsTypes.ENTER_SCREEN, getEnterScreenPayload(currentScreen));
                // tracker.trackScreenView(currentScreen)
                // console.log
              }
              // if (prevScreen !== currentScreen) {
              //   tracker.trackScreenView(currentScreen)
              // }
            }}
          />
        </ApolloProvider>
      </Root>
    );
  }
}

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
