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
    const { toggleShowGrid, shouldShowGrid } = this.props
    toggleShowGrid()
    console.log('current grid value' , shouldShowGrid)

  }

  render() {
    const { shouldShowGrid, cunty } = this.props

   console.log(cunty)

    return (
      <div className='menu'>
        <div
          className={shouldShowGrid ? 'button active' : 'button'}
          onClick={() => {this.toggleShowGrid()}}
          >
          Grid
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
        <div
          className='button'
          onClick={() => {this.movePrimitive(-60, 'x')}}
          >
          X
        </div>
        <div
          className='button'
          onClick={() => {this.movePrimitive(60, 'x')}}
          >
          X
        </div>
        <div
          className='button'
          onClick={() => {this.movePrimitive(-60, 'y')}}
          >
          Y
        </div>
        <div
          className='button'
          onClick={() => {this.movePrimitive(60, 'y')}}
          >
          Y
        </div>
        <div
          className='button'
          onClick={() => {this.movePrimitive(-60, 'z')}}
          >
          Z
        </div>
        <div
          className='button'
          onClick={() => {this.movePrimitive(60, 'z')}}
          >
          Z
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    shouldShowGrid: state.viewport.shouldShowGrid
  }
}

const mapDispatchToProps = (dispatch) =>{
  return {
    resetCamera: () => dispatch(ViewportActions.resetCamera()),
    toggleShowGrid: () => dispatch(ViewportActions.toggleShowGrid()),
    addPrimitive: (primitiveType) =>
      dispatch(PrimitivesActions.addPrimitive(primitiveType)),
    movePrimitive: (distance, axis) =>
      dispatch(PrimitivesActions.movePrimitive(distance, axis))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Menu)
