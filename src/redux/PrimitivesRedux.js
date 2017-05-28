import {createReducer, createActions} from 'reduxsauce'
import Immutable from 'seamless-immutable'

const {Types, Creators} = createActions({
  addPrimitive: ['primitiveType'],
  selectPrimitive: ['primitiveId'],
  movePrimitive: ['distance', 'axis'],
  highlightPrimitive: ['primitiveId'],
  setPrimitivePosition: ['position', 'axis'],
  updatePrimitiveAttribute: ['scope', 'attributeName', 'value']
})

export const StudioTypes = Types
export default Creators

/* ------------- Initial State ------------- */

const defaults = {
  box: {
    type: 'box',
    name: 'no name',
    size: {
      width: 100,
      height: 100,
      depth: 100,
    },
    position: {x:0, y:50, z:0},
    rotation: {x:0, y:0, z:0},
    color: '#cccccc'
  },
  sphere: {
    type: 'sphere',
    name: 'no name',
    size: {
      radius: 50
    },
    position: {x:0, y:0, z:0},
    rotation: {x:0, y:0, z:0},
    color: '#cccccc'
  },
  cylinder: {
    type: 'cylinder',
    name: 'no name',
    size: {
      height: 100,
      radius: 50
    },
    position: {x:0, y:0, z:0},
    rotation: {x:0, y:0, z:0},
    color: '#cccccc'
  }
}

export const INITIAL_STATE = Immutable({
  primitivesList: []
})

/* ---------- Helper --------------- */

const radians = (degrees) => {
  return (degrees * (Math.PI/180))
}


const addPrimitiveToArray = (primitives, primitive) => {
  if (primitives.length < 1){
    return [primitive]
  }
  const mutableObjects = Immutable.asMutable(primitives)
  mutableObjects.push(primitive)
  return Immutable(mutableObjects)
}

const transformPrimitivePosition = (primitive, distance, axis) => {
  primitive.position = {
    x: axis === 'x' ? (primitive.position.x + distance) : primitive.position.x,
    y: axis === 'y' ? (primitive.position.y + distance) : primitive.position.y,
    z: axis === 'z' ? (primitive.position.z + distance) : primitive.position.z,
  }
  return Immutable(primitive)
}

const setExplicitPrimitivePosition = (primitive, newPosition, axis) => {
  primitive.position = {
    x: axis === 'x' ? newPosition.x : primitive.position.x,
    y: axis === 'y' ? newPosition.y : primitive.position.y,
    z: axis === 'z' ? newPosition.z : primitive.position.z,
  }
  return Immutable(primitive)
}

const setExplicitPrimitiveSize = (primitive, newSize, axis) => {
  primitive.size = {
    width: axis === 'width' ? newSize : primitive.size.width,
    height: axis === 'height' ? newSize : primitive.size.height,
    depth: axis === 'depth' ? newSize : primitive.size.depth,
  }
  return Immutable(primitive)
}

const setExplicitPrimitiveRotation = (primitive, value, axis) => {
  primitive.rotation = {
    x: axis === 'x' ? radians(value) : primitive.rotation.x,
    y: axis === 'y' ? radians(value) : primitive.rotation.y,
    z: axis === 'z' ? radians(value) : primitive.rotation.z,
  }
  return Immutable(primitive)
}

const setExplicitPrimitiveAttribute = (primitive, scope, attributeName, value) => {
  if (scope === 'root') {
    primitive[attributeName] = value
  }
  else if (scope === 'position') {
    primitive = setExplicitPrimitivePosition(primitive, {x: value, y: value, z: value}, attributeName)
  }
  else if (scope === 'size') {
    primitive = setExplicitPrimitiveSize(primitive, value, attributeName)
  }
  else if (scope === 'rotation') {
    primitive = setExplicitPrimitiveRotation(primitive, value, attributeName)
  }

  return Immutable(primitive)
}


/* --------- primitive list modifiers -------- */


const selectedPrimitive = (state) => {
  // make primitiveList mutable
  const mutablePrimitives = Immutable.asMutable(state.primitivesList)
  // get the relevant primitive
  const primitive = mutablePrimitives[state.selectedPrimitiveId]
  // return mutable primitive
  return Immutable.asMutable(primitive)
}

const replacePrimitiveInList = (state, newPrimitive) => {
  // make primitiveList mutable
  const mutablePrimitives = Immutable.asMutable(state.primitivesList)
  // replace the selecte primitive with one provided
  mutablePrimitives[state.selectedPrimitiveId] = newPrimitive
  // return immutable primitiveList
  return Immutable(mutablePrimitives)
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

  const newPrimitive = transformPrimitivePosition(selectedPrimitive(state), distance, axis)
  return state.merge({
    primitivesList: replacePrimitiveInList(state, newPrimitive)
  })
}


const setPrimitivePosition = (state, {position, axis}) => {
  const newPrimitive = setExplicitPrimitivePosition(selectedPrimitive(state), position, axis)
  return state.merge({
    primitivesList: replacePrimitiveInList(state, newPrimitive)
  })
}


const updatePrimitiveAttribute = (state, {scope, attributeName, value}) => {
  const newPrimitive = setExplicitPrimitiveAttribute(selectedPrimitive(state), scope, attributeName, value)
  return state.merge({
    primitivesList: replacePrimitiveInList(state, newPrimitive)
  })
}

export const reducer = createReducer(INITIAL_STATE, {
  [Types.ADD_PRIMITIVE]: addPrimitive,
  [Types.HIGHLIGHT_PRIMITIVE]: highlightPrimitive,
  [Types.SELECT_PRIMITIVE]: selectPrimitive,
  [Types.MOVE_PRIMITIVE]: movePrimitive,
  [Types.SET_PRIMITIVE_POSITION]: setPrimitivePosition,
  [Types.UPDATE_PRIMITIVE_ATTRIBUTE]: updatePrimitiveAttribute
})
