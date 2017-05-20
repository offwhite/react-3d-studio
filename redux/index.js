import {combineReducers} from 'redux'
import {reducer as studio} from './StudioRedux'
import configureStore from './CreateStore'

export default () => {
  /* ------------- Assemble The Reducers ------------- */
  const rootReducer = combineReducers({
    studio,
  })

  return configureStore(rootReducer)
}
