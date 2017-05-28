import {createReducer, createActions} from 'reduxsauce'
import Immutable from 'seamless-immutable'

const {Types, Creators} = createActions({
  addPrimitive: ['primitiveType'],
  selectPrimitive: ['primitiveId'],
  movePrimitive: ['distance', 'axis'],
  highlightPrimitive: ['primitiveId'],
  setPrimitivePosition: ['position', 'axis']
})

export const StudioTypes = Types
export default Creators

/* ------------- Initial State ------------- */

const defaults = {
  box: {
    type: 'box',
    size: {
      width: 100,
      height: 100,
      depth: 100,
    },
    position: {x:0, y:50, z:0},
    rotation: {x:0, y:0, z:0},
    color: '#cccccc',
    selected: false
  },
  sphere: {
    type: 'sphere',
    radius: 75,
    position: {x:0, y:0, z:0},
    rotation: {x:0, y:0, z:0},
    color: '#cccccc',
    selected: false
  }
}

export const INITIAL_STATE = Immutable({
  primitivesList: []
})

/* ---------- Helper --------------- */


const addPrimitiveToArray = (primitives, primitive) => {
  if (primitives.length < 1){
    return [primitive]
  }
  const mutableObjects = Immutable.asMutable(primitives)
  mutableObjects.push(primitive)
  return Immutable(mutableObjects)
}

const transformPrimitivePosition = (primitive, distance, axis) => {
  const mutablePrimitive = Immutable.asMutable(primitive)
  mutablePrimitive.position = {
    x: axis === 'x' ? (primitive.position.x + distance) : primitive.position.x,
    y: axis === 'y' ? (primitive.position.y + distance) : primitive.position.y,
    z: axis === 'z' ? (primitive.position.z + distance) : primitive.position.z,
  }
  return Immutable(mutablePrimitive)
}

const setExplicitPrimitivePosition = (primitive, newPosition, axis) => {
  const mutablePrimitive = Immutable.asMutable(primitive)
  mutablePrimitive.position = {
    x: axis === 'x' ? newPosition.x : primitive.position.x,
    y: axis === 'y' ? newPosition.y : primitive.position.y,
    z: axis === 'z' ? newPosition.z : primitive.position.z,
  }
  return Immutable(mutablePrimitive)
}

/* ------------- Reducers ------------- */

const addPrimitive = (state, {primitiveType}) => {
  const newObject = defaults[primitiveType]
  const newObjectList = addPrimitiveToArray(state.primitivesList, newObject)

  return state.merge({
    primitivesList: newObjectList,
    selectedPrimitiveId: (newObjectList.length - 1)
  })
}

const highlightPrimitive = (state, {primitiveId}) => {
  if (primitiveId === state.selectedPrimitiveId)
    return state.merge({selectedPrimitiveId: null})

  return state.merge({selectedPrimitiveId: primitiveId})
}

const selectPrimitive = (state, {primitiveId}) => {
  if (primitiveId === state.selectedPrimitiveId)
    return state.merge({selectedPrimitiveId: null})

  return state.merge({selectedPrimitiveId: primitiveId})
}



const movePrimitive = (state, {distance, axis}) => {
  if (state.selectedPrimitiveId === null)
    return state

  // make primitives mutable
  const mutablePrimitives = Immutable.asMutable(state.primitivesList)

  // get the relevant primitive
  const primitive = mutablePrimitives[state.selectedPrimitiveId]
  // mutate it
  const newPrimitive = transformPrimitivePosition(primitive, distance, axis)

  // put it into primitive list
  mutablePrimitives[state.selectedPrimitiveId] = newPrimitive

  // store
  return state.merge({
    primitivesList: Immutable(mutablePrimitives)
  })
}



const setPrimitivePosition = (state, {position, axis}) => {
  // make primitives mutable
  const mutablePrimitives = Immutable.asMutable(state.primitivesList)
  // get the relevant primitive
  const primitive = mutablePrimitives[state.selectedPrimitiveId]
  // mutate it
  const newPrimitive = setExplicitPrimitivePosition(primitive, position, axis)
  // put it into primitive list
  mutablePrimitives[state.selectedPrimitiveId] = newPrimitive
  // store
  return state.merge({
    primitivesList: Immutable(mutablePrimitives)
  })
}


export const reducer = createReducer(INITIAL_STATE, {
  [Types.ADD_PRIMITIVE]: addPrimitive,
  [Types.HIGHLIGHT_PRIMITIVE]: highlightPrimitive,
  [Types.SELECT_PRIMITIVE]: selectPrimitive,
  [Types.MOVE_PRIMITIVE]: movePrimitive,
  [Types.SET_PRIMITIVE_POSITION]: setPrimitivePosition,
})
