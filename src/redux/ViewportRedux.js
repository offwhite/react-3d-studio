import {createReducer, createActions} from 'reduxsauce'
import Immutable from 'seamless-immutable'

import * as THREE from 'three'

const {Types, Creators} = createActions({
  startApp: ['startApp'],
  setCamera: ['cameraPosition', 'cameraRotation'],
  resetCamera: null
})

export const ViewportTypes = Types
export default Creators

/* ------------- Initial State ------------- */

const defaultCamera = {
  position: new THREE.Vector3(0, 400, 1000),
  rotation: new THREE.Euler(0,0,0),
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
  light: defaultLight
})

/* ------------- Reducers ------------- */


export const startApp = (state) => {
  return state.merge({started: true})
}

const resetCamera = (state) => {
  return state.merge({camera: defaultCamera})
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
  [Types.RESET_CAMERA]: resetCamera
})
