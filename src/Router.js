import { StackNavigator } from 'react-navigation';
import { Platform } from 'react-native';

import Main from './components/Main';
import NewEntryContainer from './containers/NewEntryContainer';
import ViewEntriesContainer from './containers/ViewEntriesContainer';
import SettingsContainer from './containers/SettingsContainer';

const BaseNavigation = StackNavigator({
  Main: { screen: Main },
  NewEntryContainer: {screen: NewEntryContainer},
  ViewEntriesContainer: {screen: ViewEntriesContainer},
  SettingsContainer: {screen: SettingsContainer}
}, {
  navigationOptions: { headerStyle: { marginTop: (Platform.OS === 'ios') ? 0 : Expo.Constants.statusBarHeight } }
});

export default BaseNavigation;
