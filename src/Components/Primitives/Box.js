import React, {Component} from 'react'
import PropTypes from 'prop-types'
import * as THREE from 'three'
import MouseInput from '../../lib/MouseInput'

import MoveGizmo from '../MoveGizmo'

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

  /* -- end mouse interation ------- */

  render() {

    const {
      position,
      rotation,
      size,
      color,
      selected
    } = this.props

    // TODO: move delected color to config

    const _color = selected ? '#a1bcde' : color

    return (
      <group>
        {
          selected && <MoveGizmo
            position={position}
            rotation={rotation}
            size={size}
          />
        }
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
          width={size.width}
          height={size.height}
          depth={size.depth}
        />
        <meshLambertMaterial
          color={_color}
        />
      </mesh>
    </group>
    )
  }
}

export default Box
