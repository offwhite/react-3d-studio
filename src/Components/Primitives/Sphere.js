import React, {Component, PropTypes} from 'react'

import * as THREE from 'three'

class Sphere extends Component {

  static propTypes() {
    return {
      position: PropTypes.object.isRequired,
      rotation: PropTypes.object.isRequired,
      radius:   PropTypes.integer.isRequired,
      color:    PropTypes.string.isRequired,
      selected: PropTypes.bool,
      name:     PropTypes.string
    }
  }

  render() {

    const {
      position,
      rotation,
      radius,
      color,
      selected,
      name
    } = this.props

    return (
      <group>
      <mesh
        castShadow
        receiveShadow
        position={position}
        rotation={rotation}
      >
        <sphereGeometry
          radius={radius}
          heightSegments={20}
          widthSegments={20}
        />
        <meshLambertMaterial
          color={color}
        />
      </mesh>
      </group>
    )
  }
}



export default Sphere
