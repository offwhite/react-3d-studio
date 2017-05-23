import {createReducer, createActions} from 'reduxsauce'
import Immutable from 'seamless-immutable'


const {Types, Creators} = createActions({
  transformBox: ['changedAttribute'],
  addBox: null,
  zoom: ['zoom'],
  removeCurrentBox: null,
  exportFile: null
})

export const StudioTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  exportedFile: '',
  zoom: 0,
  boxes: [
    {
      selected: false,
      x: 0,
      y: 0,
      z: 0,
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
  selected: true,
  x: 0,
  y: 0,
  z: 0,
  width: 1,
  height: 1,
  depth: 1,
  rotationX: 0,
  rotationY: 0,
  rotationZ: 0
}

/* ------------- Reducers ------------- */

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

const zoom = (state, {zoom}) => {
  return state.merge({zoom})
}

// get list of boxes, make it mutable, add to it, make it immutable, return it
const removeLastBox = (boxes) => {
  const mutableBoxes = Immutable.asMutable(boxes)
  if (mutableBoxes.length > 1)
    mutableBoxes.pop()
  return Immutable(mutableBoxes)
}

export const exportFile = (state) => {
  const file = exportedFile(state)
  return state.merge({exportFile: file})
}

export function exportedFile(state) {
  console.log('exportFile: ', state)
  const {boxes} = state

  let initString = `import React from 'react';
  import {
    View,
  } from 'react-vr';

  export default class 3dStudio extends React.Component {

   render() {
      return (
        <View>
`

  const endString = `</View>
);
}
};`

  boxes.map((box, i) => {
    //return this.renderBox(box, i)
    let boxString = `<Box
      dimWidth=${box.width}
      dimDepth=${box.depth}
      dimHeight=${box.height}
      style={{
        color: '#cccccc ',
        transform: [
           {translate: [${box.x}, ${box.y}, ${box.z}]},
           {rotateY: ${box.rotationX}},
           {rotateX: ${box.rotationY}},
           {rotateZ: ${box.rotationZ}}
         ],
       }}
    />`

    initString += boxString

  })

  return initString += endString

}

export const reducer = createReducer(INITIAL_STATE, {
  [Types.TRANSFORM_BOX]: transformCurrentBox,
  [Types.ZOOM]: zoom,
  [Types.ADD_BOX]: addBox,
  [Types.REMOVE_CURRENT_BOX]: removeBox,
  [Types.EXPORT_FILE]: exportFile

})
