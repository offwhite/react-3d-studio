import React, {Component} from 'react'
import {connect} from 'react-redux'
import ViewportActions from './redux/ViewportRedux'
import PrimitivesActions from './redux/PrimitivesRedux'
import './Menu.css'

class Menu extends Component {

  resetCamera(){
    const {resetCamera} = this.props
    resetCamera()
  }

  toggleShowGrid() {
    const { toggleShowGrid } = this.props
    toggleShowGrid()
  }

  toggleWireframe() {
    const { toggleWireframe } = this.props
    toggleWireframe()
  }

  render() {
    const {
      shouldShowGrid,
      showWireframe,
      addPrimitive,
      switchToMoveManipulators,
      switchToSizeManipulators,
      manipulationType
    } = this.props

    return (
      <div className='menu'>
        <div
          className={shouldShowGrid ? 'button active' : 'button'}
          onClick={() => {this.toggleShowGrid()}}
          >
          Grid
        </div>
        <div
          className={manipulationType === 'move' ? 'button active' : 'button'}
          onClick={() => {switchToMoveManipulators()}}
          >
          move
        </div>
        <div
          className={manipulationType === 'size' ? 'button active' : 'button'}
          onClick={() => {switchToSizeManipulators()}}
          >
          size
        </div>
        <div
          className={showWireframe ? 'button active' : 'button'}
          onClick={() => {this.toggleWireframe()}}
          >
          Wireframe
        </div>
        <div
          className='button'
          onClick={() => {this.resetCamera()}}
          >
          reset cam
        </div>
        <div
          className='button'
          onClick={() => {addPrimitive('box')}}
          >
          box
        </div>
        <div
          className='button'
          onClick={() => {addPrimitive('sphere')}}
          >
          ball
        </div>
        <div
          className='button'
          onClick={() => {addPrimitive('cylinder')}}
          >
          cylinder
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    shouldShowGrid: state.viewport.shouldShowGrid,
    showWireframe: state.viewport.showWireframe,
    manipulationType: state.viewport.manipulationType
  }
}

const mapDispatchToProps = (dispatch) =>{
  return {
    resetCamera: () => dispatch(ViewportActions.resetCamera()),
    toggleShowGrid: () => dispatch(ViewportActions.toggleShowGrid()),
    toggleWireframe: () => dispatch(ViewportActions.toggleWireframe()),
    switchToMoveManipulators: () => dispatch(ViewportActions.switchToMoveManipulators()),
    switchToSizeManipulators: () => dispatch(ViewportActions.switchToSizeManipulators()),
    addPrimitive: (primitiveType) =>
      dispatch(PrimitivesActions.addPrimitive(primitiveType)),
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Menu)
