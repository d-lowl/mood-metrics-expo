import { StackNavigator } from 'react-navigation';

import Main from './components/Main';
import NewEntryContainer from './containers/NewEntryContainer';
import ViewEntriesContainer from './containers/ViewEntriesContainer';

const BaseNavigation = StackNavigator({
  Main: { screen: Main },
  NewEntryContainer: {screen: NewEntryContainer},
  ViewEntriesContainer: {screen: ViewEntriesContainer}
});

export default BaseNavigation;
