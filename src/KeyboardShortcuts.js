import React, {Component} from 'react'
import {connect} from 'react-redux'

import ViewportActions from './redux/ViewportRedux'
import PrimitivesActions from './redux/PrimitivesRedux'

class KeyboardShortcuts extends Component {

  componentDidMount() {
    document.addEventListener('keydown', this.keydown.bind(this), false)
    document.removeEventListener('keyup', this.keydown.bind(this), false)
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.keydown, false)
    document.removeEventListener('keyup', this.keydown, false)
  }

  addBoxPrimitive() {
    const { addPrimitive } = this.props
    addPrimitive('box')
  }

  shortcuts(key) {
    const {
      toggleShowGrid,
      switchToMoveManipulators,
      switchToSizeManipulators,
      switchToRotateManipulators,
      toggleWireframe,
      resetCamera
    } = this.props

    return {
      g: toggleShowGrid,
      w: switchToMoveManipulators,
      e: switchToSizeManipulators,
      r: switchToRotateManipulators,
      m: toggleWireframe,
      c: resetCamera,
      b: this.addBoxPrimitive.bind(this)
    }[key]
  }

  keydown(event) {
    window.removeEventListener('keydown', this.keydown)
    const shortcutMethod = this.shortcuts([event.key])
    if(typeof(shortcutMethod) === 'function')
      this.shortcuts([event.key])()
  }

  keyup() {
    document.addEventListener('keydown', this.keydown, false).bind(this)
  }

  render() {
    return null
  }
}

const mapDispatchToProps = (dispatch) =>{
  return {
    resetCamera: () => dispatch(ViewportActions.resetCamera()),
    toggleShowGrid: () => dispatch(ViewportActions.toggleShowGrid()),
    toggleWireframe: () => dispatch(ViewportActions.toggleWireframe()),
    switchToMoveManipulators: () => dispatch(ViewportActions.switchToMoveManipulators()),
    switchToSizeManipulators: () => dispatch(ViewportActions.switchToSizeManipulators()),
    switchToRotateManipulators: () => dispatch(ViewportActions.switchToRotateManipulators()),
    addPrimitive: (primitiveType) =>
      dispatch(PrimitivesActions.addPrimitive(primitiveType)),
  }
}


export default connect(null, mapDispatchToProps)(KeyboardShortcuts)
