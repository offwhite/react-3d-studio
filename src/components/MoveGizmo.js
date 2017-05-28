import React, {Component} from 'react'
import PropTypes from 'prop-types'
import * as THREE from 'three'
import MouseInput from '../lib/MouseInput';

class MoveGizmo extends Component {

  static propTypes() {
    return {
      position:   PropTypes.object.isRequired,
      rotation:   PropTypes.object.isRequired,
    }
  }

  constructor(props, context) {
    super(props, context);

    this.overlap = 100
    this.shaftRadius = 1
    this.headHeight = 60
    this.headRadius = 10
  }

  _ref = (mesh) => {
    //const {onCreate} = this.props;

    //onCreate(mesh);
  };

  vector(position) {
    return new THREE.Vector3(position.x, position.y, position.z)
  }

  euler(rotation) {
    return new THREE.Euler( rotation.x, rotation.y, rotation.z, 'XYZ' )
  }

  renderArrow(position, axis, color) {

    const {size} = this.props

    const shaftLength = {
      x: ((size.width/2) + this.overlap),
      y: ((size.height/2) + this.overlap),
      z: ((size.depth/2) + this.overlap),
    }[axis]

    const rotation = {
      x: this.euler({x: 0, y: 0, z: 1.6}),
      y: this.euler({x: 0, y: 0, z: 0}),
      z: this.euler({x: 1.6, y: 0, z: 0}),
    }[axis]

    return (
      <group
        rotation={rotation}
      >
        <mesh
          name={'head'}
          castShadow={false}
          receiveShadow={false}
          position={this.vector({x: 0, y: shaftLength, z: 0})}
          ref={this._ref}
        >
        <cylinderGeometry
          radiusTop={0}
          radiusBottom={this.headRadius}
          height={this.headHeight}
        />
        <meshLambertMaterial
          color={color}
        />
        </mesh>
        <mesh
          name={'shaft'}
          castShadow={false}
          receiveShadow={false}
          position={this.vector({x: 0, y: (shaftLength/2), z: 0})}
        >
        <cylinderGeometry
          radiusTop={this.shaftRadius}
          radiusBottom={this.shaftRadius}
          height={shaftLength}
        />
        <meshLambertMaterial
          color={color}
        />
      </mesh>
      </group>
    )
  }

  /* -- end mouse interation ------- */

  render() {

    const {position} = this.props

    return (
      <group position={position}>
        { this.renderArrow(position, 'x', '#ff0000') }
        { this.renderArrow(position, 'y', '#00ff00') }
        { this.renderArrow(position, 'z', '#0000ff') }

      </group>
    )
  }
}

export default MoveGizmo
