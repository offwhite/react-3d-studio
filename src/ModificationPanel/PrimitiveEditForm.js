import React, {Component} from 'react'
import {connect} from 'react-redux'
import ViewportActions from '../redux/ViewportRedux'
import PrimitivesActions from '../redux/PrimitivesRedux'
import './ModificationPanel.css'

class PrimitiveEditForm extends Component {

  getPrimitive() {
    const {selectedPrimitiveId, primitivesList} = this.props
    return primitivesList[selectedPrimitiveId]
  }

  degrees(radians) {
    return (radians * (180/Math.PI))
  }


  updateAttribute(scope, attributeName, value) {
    const { updatePrimitiveAttribute } = this.props
    updatePrimitiveAttribute(scope, attributeName, value)
  }

  render() {

    const { selectedPrimitiveId, updatePrimitiveAttribute } = this.props

    const primitive = this.getPrimitive()

    if (typeof(primitive) === 'undefined')
      return null

    return (
      <div className='primitiveEditForm'>
        <div className='inputRow'>
          <h3>Name</h3>
          <input
            type='text'
            value={primitive.name}
            onChange={(event) => {this.updateAttribute('root','name', event.target.value)}}
          />
        </div>
        <div className='inputRow'>
          <h3>Color</h3>
          <input
            type='text'
            value={primitive.color}
            onChange={(event) => {this.updateAttribute('root','color', event.target.value)}}
          />
        </div>
      <div className='inputRow spinnerRow'>
        <h3>Position</h3>
        <input
          type='number'
          value={primitive.position.x}
          onChange={(event) => {this.updateAttribute('position','x', event.target.value)}}
        />
        <input
          type='number'
          value={primitive.position.y}
          onChange={(event) => {this.updateAttribute('position','y', event.target.value)}}
        />
        <input
          type='number'
          value={primitive.position.z}
          onChange={(event) => {this.updateAttribute('position','z', event.target.value)}}
        />
      </div>
      {
        primitive.type === 'box' &&
        <div className='inputRow spinnerRow'>
          <h3>Size</h3>
          <input
            type='number'
            value={primitive.size.width}
            onChange={(event) => {this.updateAttribute('size','x', event.target.value)}}
          />
          <input
            type='number'
            value={primitive.size.height}
            onChange={(event) => {this.updateAttribute('size','y', event.target.value)}}
          />
          <input
            type='number'
            value={primitive.size.depth}
            onChange={(event) => {this.updateAttribute('size','z', event.target.value)}}
          />
        </div>
      }
      {
        primitive.type === 'sphere' &&
        <div className='inputRow'>
          <h3>Radius</h3>
          <input
            type='number'
            value={primitive.size.radius}
            onChange={(event) => {this.updateAttribute('radius','radius', event.target.value)}}
          />
        </div>
      }
      {
        primitive.type === 'cylinder' &&
        <div>
          <div className='inputRow'>
            <h3>height</h3>
            <input
              type='number'
              value={primitive.size.height}
              onChange={(event) => {this.updateAttribute('size','y', event.target.value)}}
            />
          </div>
          <div className='inputRow'>
            <h3>Radius</h3>
            <input
              type='number'
              value={primitive.size.radius}
              onChange={(event) => {this.updateAttribute('radius','radius', event.target.value)}}
            />
          </div>
        </div>
      }
      <div className='inputRow spinnerRow'>
        <h3>Rotation</h3>
        <input
          type='number'
          value={this.degrees(primitive.rotation.x)}
          onChange={(event) => {this.updateAttribute('rotation','x', event.target.value)}}
        />
        <input
          type='number'
          value={this.degrees(primitive.rotation.y)}
          onChange={(event) => {this.updateAttribute('rotation','y', event.target.value)}}
        />
        <input
          type='number'
          value={this.degrees(primitive.rotation.z)}
          onChange={(event) => {this.updateAttribute('rotation','z', event.target.value)}}
        />
      </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    primitivesList:      state.primitives.primitivesList,
    selectedPrimitiveId: state.primitives.selectedPrimitiveId
  }
}

const mapDispatchToProps = (dispatch) =>{
  return {
    selectPrimitive: (primitiveId) =>
      dispatch(PrimitivesActions.selectPrimitive(primitiveId)),
    updatePrimitiveAttribute: (scope, attributeName, value) =>
      dispatch(PrimitivesActions.updatePrimitiveAttribute(scope, attributeName, value))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(PrimitiveEditForm)
