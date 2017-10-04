import { combineReducers } from 'redux';
import BaseNavigation from '../Router';
import simple from './simple';

export default combineReducers({
  navigation: (state, action) => BaseNavigation.router.getStateForAction(action, state),
  state: (state = {}) => state,
  simple
});
