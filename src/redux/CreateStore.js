import {createStore, applyMiddleware, compose} from 'redux'
import createSagaMiddleware from 'redux-saga'
import {createLogger} from 'redux-logger'

// creates the store
export default (rootReducer, rootSaga) => {
  /* ------------- Redux Configuration ------------- */

  const middleware = []
  const enhancers = []

  /* ------------- Saga Middleware ------------- */

  const sagaMiddleware = createSagaMiddleware()
  middleware.push(sagaMiddleware)

  /* ------------- Logger Middleware ------------- */

  const __DEV__ = true

  if (__DEV__) {
      // create the logger
      const logger = createLogger()
      middleware.push(logger)
    }
  /* ------------- Assemble Middleware ------------- */

  enhancers.push(applyMiddleware(...middleware))

  /* ------------- AutoRehydrate Enhancer ------------- */

  // add the autoRehydrate enhancer

  const store = createStore(rootReducer, compose(...enhancers))

  // configure persistStore and check reducer version number

  // kick off root saga
  //sagaMiddleware.run(rootSaga, store.dispatch)

  return store
}
