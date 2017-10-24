import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { ApolloClient, createNetworkInterface } from 'react-apollo';
import { AsyncStorage } from 'react-native';
import reducers from './reducers';

const networkInterface = createNetworkInterface({
  uri: 'https://api.graph.cool/simple/v1/cj8yg0hrr059g01425iwvnn77',
});

networkInterface.use([{
  applyMiddleware(req, next) {
    if (!req.options.headers) {
      req.options.headers = {}
    }

    AsyncStorage.getItem('auth:token')
      .then((token) => {
        req.options.headers.authorization = `Bearer ${token}`
        next()
      })
      .catch((error) => {
        console.error(error)
        next()
      })
  }
}])

export const apolloClient = new ApolloClient({ networkInterface });

export const store = createStore(
  combineReducers({
    ...(reducers()),
    apollo: apolloClient.reducer()
  }),
  compose(
    applyMiddleware(apolloClient.middleware())
  )
);
