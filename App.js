import React from 'react';
import { Provider } from 'react-redux';
import { ApolloProvider } from 'react-apollo';

import { store, apolloClient } from './src/Store';
import BaseNavigation from './src/Router';

const App = () => (
  <ApolloProvider store={store} client={apolloClient}>
    <BaseNavigation />
  </ApolloProvider>
);

export default App;
