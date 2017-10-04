import { StackNavigator } from 'react-navigation';

import Main from './components/Main';
import NewEntryComponent from './components/NewEntryComponent';
import ViewEntriesComponent from './components/ViewEntriesComponent';

const BaseNavigation = StackNavigator({
  Main: { screen: Main },
  NewEntryComponent: {screen: NewEntryComponent},
  ViewEntriesComponent: {screen: ViewEntriesComponent}
});

export default BaseNavigation;
