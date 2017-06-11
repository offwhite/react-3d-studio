import React, {Component} from 'react'
import {connect} from 'react-redux'
import PrimitivesActions from '../redux/PrimitivesRedux'
import './ModificationPanel.css'

class PrimitivesList extends Component {

  renderPrimitive(primitive, key) {
    const {selectPrimitive, deletePrimitive, selectedPrimitiveId} = this.props

    const selected = selectedPrimitiveId === key

    return (
      <div
        className={selected ? 'selected': ''}
        onClick={() => {selectPrimitive(key)}}
        key={key}
      >
        {primitive.name}
        <div
          className='deletePrimitive'
          onClick={() => {deletePrimitive(key)}}
        ></div>
      </div>
    )
  }

  render() {
    const { primitivesList } = this.props

    return (
      <div className='primitivesList'>
        {
          primitivesList.map((primitive, key) => {
            return this.renderPrimitive(primitive, key)
          })
        }
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
    deletePrimitive: (primitiveId) =>
      dispatch(PrimitivesActions.deletePrimitive(primitiveId))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(PrimitivesList)
