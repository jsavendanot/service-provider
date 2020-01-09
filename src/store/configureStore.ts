import { applyMiddleware, createStore, compose, Store } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { UnionRootState } from 'store/rootStates';
import { AllActionTypes } from 'actions/actionTypes';
// import { createLogger } from 'redux-logger';

import rootReducer from 'reducers';

// const loggerMiddleware = createLogger();

export default function configureStore(
  preloadedState: any = {}
): Store<UnionRootState, AllActionTypes> {
  const middlewares = [thunkMiddleware]; // loggerMiddleware
  const middlewareEnhancer = composeWithDevTools(
    applyMiddleware(...middlewares)
  );

  // const enhancers = [middlewareEnhancer];
  const composedEnhancers = compose(middlewareEnhancer);

  const store = createStore(rootReducer, preloadedState, composedEnhancers);

  return store;
}
