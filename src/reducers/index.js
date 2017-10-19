import BaseNavigation from '../Router';
import entry from './entry';

export default () => ({
  navigation: (state, action) => BaseNavigation.router.getStateForAction(action, state),
  state: (state = {}) => state,
  entry
});
