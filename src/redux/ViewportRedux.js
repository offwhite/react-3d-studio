import {createReducer, createActions} from 'reduxsauce'
import Immutable from 'seamless-immutable'

import * as THREE from 'three'

const {Types, Creators} = createActions({
  startApp: ['startApp'],
  setCamera: ['cameraPosition', 'cameraRotation'],
  resetCamera: null,
  resetCameraComplete: null,
  toggleShowGrid: null,
  toggleWireframe: null,
  switchToMoveManipulators: null,
  switchToSizeManipulators: null
})

export const ViewportTypes = Types
export default Creators

/* ------------- Initial State ------------- */

const defaultCamera = {
  position: new THREE.Vector3(-500, 400, 800),
  rotation: new THREE.Euler(0,0,10)
}

const defaultLight = {
  ambient: {
    color: '#666666'
  },
  spotlight: {
    position: new THREE.Vector3(0, 500, 2000),
    target: new THREE.Vector3(0, 0, 0),
    color: '#ffffff',
    intensity: 0.5,
    castShadow: true
  }
}

export const INITIAL_STATE = Immutable({
  camera: defaultCamera,
  light: defaultLight,
  shouldShowGrid: true,
  showWireframe: false,
  resetCamera: false,
  manipulationType: 'move'
})

/* ------------- Reducers ------------- */


export const startApp = (state) => {
  return state.merge({started: true})
}

const resetCamera = (state) => {
  return state.merge({resetCamera: true})
}

const resetCameraComplete = (state) => {
  return state.merge({resetCamera: false})
}

const toggleShowGrid = (state) => {
  return state.merge({shouldShowGrid: !state.shouldShowGrid})
}

const switchToMoveManipulators = (state) => {
  return state.merge({manipulationType: 'move'})
}

const switchToSizeManipulators = (state) => {
  return state.merge({manipulationType: 'size'})
}

const toggleWireframe = (state) => {
  return state.merge({showWireframe: !state.showWireframe})
}

const setCamera = (state, {cameraPosition, cameraRotation}) => {
  return state.merge({
    camera: {
      position: cameraPosition,
      rotation: cameraRotation
    }
  })
}


export const reducer = createReducer(INITIAL_STATE, {
  [Types.START_APP]: startApp,
  [Types.SET_CAMERA]: setCamera,
  [Types.RESET_CAMERA]: resetCamera,
  [Types.RESET_CAMERA_COMPLETE]: resetCameraComplete,
  [Types.TOGGLE_SHOW_GRID]: toggleShowGrid,
  [Types.TOGGLE_WIREFRAME]: toggleWireframe,
  [Types.SWITCH_TO_MOVE_MANIPULATORS]: switchToMoveManipulators,
  [Types.SWITCH_TO_SIZE_MANIPULATORS]: switchToSizeManipulators
})
