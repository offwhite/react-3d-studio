import {createReducer, createActions} from 'reduxsauce'
import Immutable from 'seamless-immutable'

const {Types, Creators} = createActions({
  addPrimitive: ['primitiveType'],
  selectPrimitive: ['primitiveId'],
  highlightPrimitive: ['primitiveId'],
  setExplicitPosition: ['position'],
  setExplicitRotation: ['rotation'],
  setExplicitSize: ['size'],
  updatePrimitiveAttribute: ['scope', 'attributeName', 'value'],
  deletePrimitive: ['primitiveId']
})

export const PrimitivesTypes = Types
export default Creators

/* ------------- Initial State ------------- */

const defaults = {
  box: {
    type: 'box',
    name: 'Un-named box',
    size: {
      width: 100,
      height: 100,
      depth: 100,
    },
    axisDimensionMap: {
      x: 'width',
      y: 'height',
      z: 'depth'
    },
    position: {x:0, y:50, z:0},
    rotation: {x:0, y:0, z:0},
    color: '#2f404c'
  },
  sphere: {
    type: 'sphere',
    name: 'Un-named sphere',
    size: {
      radius: 50
    },
    axisDimensionMap: {
      x: 'radius',
      y: 'radius',
      z: 'radius'
    },
    position: {x:0, y:0, z:0},
    rotation: {x:0, y:0, z:0},
    color: '#2f404c'
  },
  cylinder: {
    type: 'cylinder',
    name: 'Un-named cylinder',
    size: {
      height: 100,
      radius: 50
    },
    axisDimensionMap: {
      x: 'radius',
      y: 'height',
      z: 'radius'
    },
    position: {x:0, y:0, z:0},
    rotation: {x:0, y:0, z:0},
    color: '#2f404c'
  }
}

export const INITIAL_STATE = Immutable({
  primitivesList: []
})





/* ---------- Helpers --------------- */

const radians = (degrees) => {
  return (degrees * (Math.PI/180))
}

/* -------- Array Manipulation ----------- */

const addPrimitiveToArray = (primitives, primitive) => {
  if (primitives.length < 1){
    return [primitive]
  }
  const mutableObjects = Immutable.asMutable(primitives)
  mutableObjects.push(primitive)
  return Immutable(mutableObjects)
}





/* -------- Primitive Manipulation ---------- */

const setExplicitPrimitivePosition = (primitive, newPosition, axis) => {
  primitive.position = newPosition
  return Immutable(primitive)
}

const setExplicitPrimitiveRotation = (primitive, newRotation) => {
  primitive.rotation = newRotation
  return Immutable(primitive)
}

const setExplicitPrimitiveSize = (primitive, newSize) => {
  primitive.size = newSize
  return Immutable(primitive)
}

const setPrimitivePositionOnAxis = (primitive, newPosition, axis) => {
  primitive.position = {
    x: axis === 'x' ? newPosition.x : primitive.position.x,
    y: axis === 'y' ? newPosition.y : primitive.position.y,
    z: axis === 'z' ? newPosition.z : primitive.position.z,
  }
  return Immutable(primitive)
}

const setPrimitiveSizeOnAxis = (primitive, newSize, axis) => {
  const mutableSize = Immutable.asMutable(primitive.size)
  mutableSize[axis] = newSize
  primitive.size = Immutable(mutableSize)
  return Immutable(primitive)
}

const setPrimitiveRotationOnAxis = (primitive, value, axis) => {
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
    primitive = setPrimitivePositionOnAxis(primitive, {x: value, y: value, z: value}, attributeName)
  }
  else if (scope === 'size') {
    primitive = setPrimitiveSizeOnAxis(primitive, {x: value, y: value, z: value}, attributeName)
  }
  else if (scope === 'radius') {
    primitive = setPrimitiveSizeOnAxis(primitive, {radius: value}, attributeName)
  }
  else if (scope === 'rotation') {
    primitive = setPrimitiveRotationOnAxis(primitive, value, attributeName)
  }

  return Immutable(primitive)
}


/* --------- primitive list modifiers -------- */

const selectedPrimitive = (state) => {
  if (state.selectedPrimitiveId === null)
    return state
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

const setExplicitPosition = (state, {position}) => {
  const newPrimitive = setExplicitPrimitivePosition(selectedPrimitive(state), position)
  return state.merge({
    primitivesList: replacePrimitiveInList(state, newPrimitive)
  })
}

const setExplicitRotation = (state, {rotation}) => {
  const newPrimitive = setExplicitPrimitiveRotation(selectedPrimitive(state), rotation)
  return state.merge({
    primitivesList: replacePrimitiveInList(state, newPrimitive)
  })
}

const setExplicitSize = (state, {size}) => {
  const newPrimitive = setExplicitPrimitiveSize(selectedPrimitive(state), size)
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


const deletePrimitive = (state, {primitiveId}) => {
  const mutablePrimitives = Immutable.asMutable(state.primitivesList)

  if (primitiveId < 0)
    return state

  // remove from array
  mutablePrimitives.splice(primitiveId, 1)

  // update selected primitive
  const newSelection = (primitiveId !== state.selectedPrimitiveId) ? state.selectedPrimitiveId : null

  return state.merge({
    primitivesList: Immutable(mutablePrimitives),
    selectedPrimitiveId: newSelection
  })
}


/* --------- Export ------------ */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.ADD_PRIMITIVE]: addPrimitive,
  [Types.HIGHLIGHT_PRIMITIVE]: highlightPrimitive,
  [Types.SELECT_PRIMITIVE]: selectPrimitive,
  [Types.SET_EXPLICIT_POSITION]: setExplicitPosition,
  [Types.SET_EXPLICIT_ROTATION]: setExplicitRotation,
  [Types.SET_EXPLICIT_SIZE]: setExplicitSize,
  [Types.UPDATE_PRIMITIVE_ATTRIBUTE]: updatePrimitiveAttribute,
  [Types.DELETE_PRIMITIVE]: deletePrimitive
})
