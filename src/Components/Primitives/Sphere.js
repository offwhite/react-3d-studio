import React, {Component, PropTypes} from 'react'
import * as THREE from 'three'
import MouseInput from '../../lib/MouseInput';

class Sphere extends Component {

  static propTypes() {
    return {
      onCreate:   PropTypes.func.isRequired,
      id:         PropTypes.integer.isRequired,
      mouseInput: PropTypes.instanceOf(MouseInput),
      camera:     PropTypes.instanceOf(THREE.PerspectiveCamera),

      position: PropTypes.object.isRequired,
      rotation: PropTypes.object.isRequired,
      radius:   PropTypes.integer.isRequired,
      color:    PropTypes.string.isRequired,
      selected: PropTypes.bool,
      name:     PropTypes.string
    }
  }

  _onMouseEnter = (event, intersection) => {
    console.log('mouse enter mesh')
    event.preventDefault();
    event.stopPropagation();
  }
  _onMouseDown = (event, intersection) => {
    const {id, selectPrimitive} = this.props
    selectPrimitive(id)
    event.preventDefault();
    event.stopPropagation();
  }
  _onMouseLeave = (event, intersection) => {
    console.log('mouse leave mesh')
    event.preventDefault();
    event.stopPropagation();
  }

  _ref = (mesh) => {
    const {onCreate} = this.props;

    onCreate(mesh);
  };

  render() {

    const {
      position,
      rotation,
      radius,
      color,
      selected,
      name
    } = this.props

    const _color = selected ? '#ff0000' : color

    return (
      <group>
      <mesh
        castShadow
        receiveShadow
        position={position}
        rotation={rotation}

        onMouseEnter={this._onMouseEnter}
        onMouseDown={this._onMouseDown}
        onMouseLeave={this._onMouseLeave}
        ref={this._ref}
      >
        <sphereGeometry
          radius={radius}
          heightSegments={20}
          widthSegments={20}
        />
        <meshLambertMaterial
          color={_color}
        />
      </mesh>
      </group>
    )
  }
}



export default Sphere
