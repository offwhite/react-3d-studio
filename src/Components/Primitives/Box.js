import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import * as THREE from 'three'
import MouseInput from '../../lib/MouseInput';

class Box extends Component {

  static propTypes() {
    return {
      onCreate:   PropTypes.func.isRequired,
      id:         PropTypes.integer.isRequired,
      mouseInput: PropTypes.instanceOf(MouseInput),
      camera:     PropTypes.instanceOf(THREE.PerspectiveCamera),
      position:   PropTypes.object.isRequired,
      rotation:   PropTypes.object.isRequired,
      size:       PropTypes.object.isRequired,
      color:      PropTypes.string.isRequired,
      selected:   PropTypes.bool,
      name:       PropTypes.string,
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

  _color = () => {
    const {selected, color} = this.props
    if (selected)
      return '#ff0000'
    return color
  }

  /* -- end moving ------- */

  render() {

    const {
      position,
      rotation,
      size,
      selected,
      id,
      name
    } = this.props

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
        <boxGeometry
          width={100}
          height={100}
          depth={100}
        />
        <meshLambertMaterial
          color={this._color()}
        />
      </mesh>
    </group>
    )
  }
}

export default Box
