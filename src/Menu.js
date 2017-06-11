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

  toggleExport() {
    const { toggleExport } = this.props
    toggleExport()
  }

  render() {
    const {
      shouldShowGrid,
      showWireframe,
      addPrimitive,
      showExport,
      switchToMoveManipulators,
      switchToSizeManipulators,
      switchToRotateManipulators,
      manipulationType
    } = this.props

    return (
      <div className='menu'>
        <div
          className={showExport ? 'button export active' : 'button export'}
          onClick={() => {this.toggleExport()}}
          title="Export"
          ></div>
        <div className="divider"></div>
        <div
          className={shouldShowGrid ? 'button grid active' : 'button grid'}
          onClick={() => {this.toggleShowGrid()}}
          title="Grid"
          ></div>
        <div
          className={showWireframe ? 'button wireframe active' : 'button wireframe'}
          onClick={() => {this.toggleWireframe()}}
          title="Wireframe"
          ></div>
        <div
          className='button reset-camera'
          onClick={() => {this.resetCamera()}}
          title="Reset Camera"
          ></div>
        <div className="divider"></div>
        <div
          className={manipulationType === 'translate' ? 'button move active' : 'button move'}
          onClick={() => {switchToMoveManipulators()}}
          title="Move"
          ></div>
        <div
          className={manipulationType === 'scale' ? 'button size active' : 'button size'}
          onClick={() => {switchToSizeManipulators()}}
          title="Scale"
          ></div>
        <div
          className={manipulationType === 'rotate' ? 'button rotate active' : 'button rotate'}
          onClick={() => {switchToRotateManipulators()}}
          title="Rotate"
          ></div>
        <div className="divider"></div>
        <div
          className='button new-box'
          onClick={() => {addPrimitive('box')}}
          title="New Box"
          ></div>
        <div
          className='button new-ball'
          onClick={() => {addPrimitive('sphere')}}
          title="new Sphere"
          ></div>
        <div
          className='button new-cylinder'
          onClick={() => {addPrimitive('cylinder')}}
          title="New Cylinder"
          ></div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    shouldShowGrid: state.viewport.shouldShowGrid,
    showWireframe: state.viewport.showWireframe,
    manipulationType: state.viewport.manipulationType,
    showExport: state.viewport.showExport
  }
}

const mapDispatchToProps = (dispatch) =>{
  return {
    resetCamera: () => dispatch(ViewportActions.resetCamera()),
    toggleShowGrid: () => dispatch(ViewportActions.toggleShowGrid()),
    toggleWireframe: () => dispatch(ViewportActions.toggleWireframe()),
    toggleExport: () => dispatch(ViewportActions.toggleExport()),
    switchToMoveManipulators: () => dispatch(ViewportActions.switchToMoveManipulators()),
    switchToSizeManipulators: () => dispatch(ViewportActions.switchToSizeManipulators()),
    switchToRotateManipulators: () => dispatch(ViewportActions.switchToRotateManipulators()),
    addPrimitive: (primitiveType) =>
      dispatch(PrimitivesActions.addPrimitive(primitiveType)),
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Menu)
