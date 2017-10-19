import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { ApolloClient, createNetworkInterface } from 'react-apollo';

import reducers from './reducers';

export const apolloClient = new ApolloClient({
  networkInterface: createNetworkInterface({
    uri: 'https://api.graph.cool/simple/v1/cj8yg0hrr059g01425iwvnn77',
  })
});

// console.log(reducers);

export const store = createStore(
  combineReducers({
    ...(reducers()),
    apollo: apolloClient.reducer()
  }),
  compose(
    applyMiddleware(apolloClient.middleware())
  )
);

// export default store;
