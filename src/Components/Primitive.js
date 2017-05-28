import React, {Component} from 'react'
import PropTypes from 'prop-types'
import * as THREE from 'three'
import MouseInput from '../ref/MouseInput'

import MoveGizmo from './MoveGizmo'

class Primitive extends Component {

  static propTypes() {
    return {
      onCreate:             PropTypes.func.isRequired,
      id:                   PropTypes.integer.isRequired,
      mouseInput:           PropTypes.instanceOf(MouseInput),
      camera:               PropTypes.instanceOf(THREE.PerspectiveCamera),
      setPrimitivePosition: PropTypes.func.isRequired,

      position:             PropTypes.object.isRequired,
      rotation:             PropTypes.object.isRequired,
      size:                 PropTypes.object.isRequired,
      color:                PropTypes.string.isRequired,
      selected:             PropTypes.bool,
      name:                 PropTypes.string,
      type:                 PropTypes.string.isRequired
    }
  }


  _onMouseEnter = (event, intersection) => {
    event.preventDefault();
    event.stopPropagation();
  }

  _onMouseDown = (event, intersection) => {
    const {id, selectPrimitive, showWireframe} = this.props
    event.preventDefault()
    event.stopPropagation()
    if (!showWireframe)
      selectPrimitive(id)
  }
  _onMouseLeave = (event, intersection) => {
    event.preventDefault();
    event.stopPropagation();
  }

  _ref = (mesh) => {
    const {onCreate} = this.props;
    onCreate(mesh);
  };

  /* -- end mouse interation ------- */

  getGixmoSizes(){
    const { type, size } = this.props
    return {
      box: size,
      sphere: {width: size.radius, height: size.radius, depth: size.radius},
      cylinder: {width: size.radius, height: size.height, depth: size.radius}
    }[type]
  }


 /* --------- Render geometry ------ */

  renderGeometry(){
    const { type, size } = this.props

    return {
      box: <boxGeometry
        width={size.width}
        height={size.height}
        depth={size.depth}
      />,
      sphere: <sphereGeometry
        radius={size.radius}
        heightSegments={20}
        widthSegments={20}
      />,
      cylinder: <cylinderGeometry
        radiusTop={size.radius}
        radiusBottom={size.radius}
        height={size.height}
        heightSegments={20}
        radialSegments={20}
      />
    }[type]
  }


  render() {

    const {
      position,
      rotation,
      size,
      color,
      selected,
      onCreate,
      mouseInput,
      camera,
      setPrimitivePosition,
      showWireframe
    } = this.props

    // TODO: move delected color to config

    const _color = selected ? '#a1bcde' : color

    return (
      <group>
        <MoveGizmo
          onCreate={onCreate}
          mouseInput={mouseInput}
          camera={camera}
          position={position}
          size={this.getGixmoSizes()}
          visible={selected}
          setPrimitivePosition={setPrimitivePosition}
        />
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
        {
          this.renderGeometry()
        }
        <meshLambertMaterial
          color={_color}
          wireframe={showWireframe}
        />
      </mesh>
    </group>
    )
  }
}

export default Primitive
