import { StackNavigator } from 'react-navigation';

import Main from './components/Main';
import NewEntryComponent from './components/NewEntryComponent';

const BaseNavigation = StackNavigator({
  Main: { screen: Main },
  NewEntryComponent: {screen: NewEntryComponent}
});

export default BaseNavigation;
