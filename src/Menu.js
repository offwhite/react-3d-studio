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

  createBox(){
    const {addPrimitive} = this.props
    addPrimitive('box')
  }

  createSphere(){
    const {addPrimitive} = this.props
    addPrimitive('sphere')
  }

  movePrimitive(distance, axis){
    const {movePrimitive} = this.props
    movePrimitive(distance, axis)
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
    const { shouldShowGrid, showWireframe } = this.props

    return (
      <div className='menu'>
        <div
          className={shouldShowGrid ? 'button active' : 'button'}
          onClick={() => {this.toggleShowGrid()}}
          >
          Grid
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
          Reset Camera
        </div>
        <div
          className='button'
          onClick={() => {this.createBox()}}
          >
          Add a box
        </div>
        <div
          className='button'
          onClick={() => {this.createSphere()}}
          >
          Add a ball
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    shouldShowGrid: state.viewport.shouldShowGrid,
    showWireframe: state.viewport.showWireframe
  }
}

const mapDispatchToProps = (dispatch) =>{
  return {
    resetCamera: () => dispatch(ViewportActions.resetCamera()),
    toggleShowGrid: () => dispatch(ViewportActions.toggleShowGrid()),
    toggleWireframe: () => dispatch(ViewportActions.toggleWireframe()),
    addPrimitive: (primitiveType) =>
      dispatch(PrimitivesActions.addPrimitive(primitiveType)),
    movePrimitive: (distance, axis) =>
      dispatch(PrimitivesActions.movePrimitive(distance, axis))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Menu)
