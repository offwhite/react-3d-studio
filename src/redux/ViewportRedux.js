import {createReducer, createActions} from 'reduxsauce'
import Immutable from 'seamless-immutable'

import * as THREE from 'three'

const {Types, Creators} = createActions({
  startApp: ['startApp'],
  setCamera: ['cameraPosition', 'cameraRotation'],
  resetCamera: null,
  resetCameraComplete: null,
  toggleShowGrid: null
})

export const ViewportTypes = Types
export default Creators

/* ------------- Initial State ------------- */

const defaultCamera = {
  position: new THREE.Vector3(0, 400, 1000),
  rotation: new THREE.Euler(0,0,0)
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
  resetCamera: false
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
  [Types.TOGGLE_SHOW_GRID]: toggleShowGrid
})
