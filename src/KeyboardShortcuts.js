import React, {Component} from 'react'
import {connect} from 'react-redux'

import ViewportActions from './redux/ViewportRedux'

class KeyboardShortcuts extends Component {

  componentDidMount() {
    document.addEventListener('keydown', this.keydown.bind(this), false)
    document.removeEventListener('keyup', this.keydown.bind(this), false)
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.keydown, false)
    document.removeEventListener('keyup', this.keydown, false)
  }

  shortcuts(key) {
    const {
      toggleShowGrid,
      switchToMoveManipulators,
      switchToSizeManipulators,
      toggleWireframe,
      resetCamera
    } = this.props
    return {
      g: toggleShowGrid,
      w: switchToMoveManipulators,
      e: switchToSizeManipulators,
      m: toggleWireframe,
      c: resetCamera
    }[key]
  }

  keydown(event) {
    window.removeEventListener('keydown', this.keydown)
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
    switchToSizeManipulators: () => dispatch(ViewportActions.switchToSizeManipulators())
  }
}


export default connect(null, mapDispatchToProps)(KeyboardShortcuts)
