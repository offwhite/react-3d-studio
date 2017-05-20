import {createStore, applyMiddleware, compose} from 'redux'
//import createSagaMiddleware from 'redux-saga'
import R from 'ramda'
import {createLogger} from 'redux-logger'

// creates the store
export default (rootReducer, rootSaga) => {
  /* ------------- Redux Configuration ------------- */

  const middleware = []
  const enhancers = []

  /* ------------- Saga Middleware -------------

  const sagaMiddleware = createSagaMiddleware()
  middleware.push(sagaMiddleware)

  /* ------------- Logger Middleware ------------- */

  if (__DEV__) {
      // the logger master switch
      const USE_LOGGING = true
      // silence these saga-based messages
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
