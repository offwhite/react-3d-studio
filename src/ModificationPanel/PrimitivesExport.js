import React, {Component} from 'react'
import {connect} from 'react-redux'
import Template from '../ref/ExportTemplate'

class PrimitivesExport extends Component {

  constructor() {
    super()
    this.scaleRatio = 1000
  }

  renderBox(primitive) {
    return (`
        <Box
          dimWidth={${primitive.size.width / this.scaleRatio}}
          dimDepth={${primitive.size.depth / this.scaleRatio}}
          dimHeight={${primitive.size.height / this.scaleRatio}}
          style={{
            color: '${primitive.color}',
            transform: [
               {translate: [
                 ${primitive.position.x / this.scaleRatio},
                 ${primitive.position.y / this.scaleRatio},
                 ${primitive.position.z / this.scaleRatio}
               ]},
               {rotateY: ${primitive.rotation.x}},
               {rotateX: ${primitive.rotation.y}},
               {rotateZ: ${primitive.rotation.z}}
             ],
           }}
        />`)
  }
  renderSphere(primitive) {
    return (`
        <Sphere
          radius={${primitive.size.radius / this.scaleRatio}}
          widthSegments={20}
          heightSegments={12}
          style={{
            color: '${primitive.color}',
            transform: [
               {translate: [
                 ${primitive.position.x / this.scaleRatio},
                 ${primitive.position.y / this.scaleRatio},
                 ${primitive.position.z / this.scaleRatio}
               ]},
               {rotateY: ${primitive.rotation.x}},
               {rotateX: ${primitive.rotation.y}},
               {rotateZ: ${primitive.rotation.z}}
             ],
           }}
        />`)
  }
  renderCylinder(primitive) {
    return (`
        <Cylinder
          radiusTop={${primitive.size.radius / this.scaleRatio}}
          radiusBottom={${primitive.size.radius / this.scaleRatio}}
          dimHeight={${primitive.size.height / this.scaleRatio}}
          segments={20}
          style={{
            color: '${primitive.color}',
            transform: [
               {translate: [
                 ${primitive.position.x / this.scaleRatio},
                 ${primitive.position.y / this.scaleRatio},
                 ${primitive.position.z / this.scaleRatio}
               ]},
               {rotateY: ${primitive.rotation.x}},
               {rotateX: ${primitive.rotation.y}},
               {rotateZ: ${primitive.rotation.z}}
             ],
           }}
        />`)
  }

  render() {

    const { primitivesList, showExport } = this.props

    if(!showExport)
      return (null)

    return (
      <div className='PrimitivesExport'>
        <pre>
          {Template.header}
          {
            primitivesList.map((primitive, i) => {
              if(primitive.type === 'box')
                return this.renderBox(primitive)
              if(primitive.type === 'sphere')
                return this.renderSphere(primitive)
              if(primitive.type === 'cylinder')
                return this.renderCylinder(primitive)
              return ({})
            })
          }
          {Template.footer}
        </pre>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    showExport:     state.viewport.showExport,
    primitivesList: state.primitives.primitivesList
  }
}

export default connect(mapStateToProps)(PrimitivesExport)
