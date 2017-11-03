import BaseNavigation from '../Router';
import entry from './entry';
import auth from './auth';

export default () => ({
  navigation: (state, action) => BaseNavigation.router.getStateForAction(action, state),
  state: (state = {}) => state,
  entry,
  auth
});
