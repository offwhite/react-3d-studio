import {combineReducers} from 'redux'
import {reducer as viewport} from './ViewportRedux'
import {reducer as primitives} from './PrimitivesRedux'
import configureStore from './CreateStore'

export default () => {
  /* ------------- Assemble The Reducers ------------- */
  const rootReducer = combineReducers({
    viewport,
    primitives
  })

  return configureStore(rootReducer)
}
