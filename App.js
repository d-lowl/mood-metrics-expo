import React from 'react';
import { Provider } from 'react-redux';

import Store from './src/Store';
import BaseNavigation from './src/Router';

const App = () => (
  <Provider store={Store}>
    <BaseNavigation />
  </Provider>
);

export default App;
