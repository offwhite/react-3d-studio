import {createReducer, createActions} from 'reduxsauce'
import Immutable from 'seamless-immutable'


const {Types, Creators} = createActions({
  transformBox: ['changedAttribute'],
  addBox: null,
  removeCurrentBox: null
})

export const StudioTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  boxes: [
    {
      x: 1,
      y: 0,
      z: -10,
      width: 1,
      height: 1,
      depth: 1,
      rotationX: 0,
      rotationY: 0,
      rotationZ: 0
    }
  ]
})

const defaultBox = {
  x: 1,
  y: 0,
  z: -10,
  width: 1,
  height: 1,
  depth: 1,
  rotationX: 0,
  rotationY: 0,
  rotationZ: 0
}

/* ------------- Reducers ------------- */

// we're attempting to login
export const transformCurrentBox = (state, {changedAttribute}) => {
  const lastIndex = state.boxes.length - 1
  const changedAttributeName = Object.keys(changedAttribute)[0]

  return state.setIn(['boxes', `${lastIndex}`, changedAttributeName], changedAttribute[changedAttributeName])
}

export const addBox = (state) => {
  return state.update('boxes', addNewBox)
}

export const removeBox = (state) => {
  return state.update('boxes', removeLastBox)
}

const addNewBox = (boxes) => {
  const mutableBoxes = Immutable.asMutable(boxes)
  mutableBoxes.push(defaultBox)
  return Immutable(mutableBoxes)
}

const removeLastBox = (boxes) => {
  const mutableBoxes = Immutable.asMutable(boxes)
  if (mutableBoxes.length > 1)
    mutableBoxes.pop()
  return Immutable(mutableBoxes)
}

export const reducer = createReducer(INITIAL_STATE, {
  [Types.TRANSFORM_BOX]: transformCurrentBox,
  [Types.ADD_BOX]: addBox,
  [Types.REMOVE_CURRENT_BOX]: removeBox,

})
