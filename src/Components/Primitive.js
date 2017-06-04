import React, {Component} from 'react'
import PropTypes from 'prop-types'
import * as THREE from 'three'
import MouseInput from '../ref/MouseInput'

import MoveGizmo from './MoveGizmo'
import SizeGizmo from './SizeGizmo'
import RotateGizmo from './RotateGizmo'

class Primitive extends Component {

  static propTypes() {
    return {
      onCreate:             PropTypes.func.isRequired,
      onDestroy:            PropTypes.func.isRequired,
      id:                   PropTypes.integer.isRequired,
      mouseInput:           PropTypes.instanceOf(MouseInput),
      camera:               PropTypes.instanceOf(THREE.PerspectiveCamera),
      setPrimitivePosition: PropTypes.func.isRequired,
      setPrimitiveSize:     PropTypes.func.isRequired,
      manipulationType:     PropTypes.string.isRequired,

      position:             PropTypes.object.isRequired,
      rotation:             PropTypes.object.isRequired,
      size:                 PropTypes.object.isRequired,
      axisDimensionMap:     PropTypes.object.isRequired,
      color:                PropTypes.string.isRequired,
      selected:             PropTypes.bool,
      name:                 PropTypes.string,
      type:                 PropTypes.string.isRequired
    }
  }

  componentWillUnmount = () => {
    const { onDestroy, mouseInput } = this.props
    mouseInput.flagClearIntersetions()
    onDestroy()
  }

  selectedColor = () => {
    const { color } = this.props
    const tint = '#0000ff'
    const percentage = 0.5
    var f=parseInt(color.slice(1),16),
        t=parseInt(tint.slice(1),16),
        R1=f>>16,
        G1=f>>(8&0x00FF),
        B1=f&0x0000FF,
        R2=t>>16,
        G2=t>>(8&0x00FF),
        B2=t&0x0000FF;
    return "#"+(0x1000000+(Math.round((R2-R1)*percentage)+R1)*0x10000+(Math.round((G2-G1)*percentage)+G1)*0x100+(Math.round((B2-B1)*percentage)+B1)).toString(16).slice(1);
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
      axisDimensionMap,
      color,
      selected,
      onCreate,
      mouseInput,
      camera,
      setPrimitivePosition,
      setPrimitiveSize,
      showWireframe,
      manipulationType
    } = this.props

    const _color = selected ? this.selectedColor() : color

    return (
      <group>
        <SizeGizmo
          onCreate={onCreate}
          mouseInput={mouseInput}
          camera={camera}
          position={position}
          rotation={rotation}
          size={size}
          axisDimensionMap={axisDimensionMap}
          visible={ selected && manipulationType === 'size' }
          setPrimitiveSize={setPrimitiveSize}
        />
      <RotateGizmo
          onCreate={onCreate}
          mouseInput={mouseInput}
          camera={camera}
          position={position}
          rotation={rotation}
          size={size}
          axisDimensionMap={axisDimensionMap}
          visible={ selected && manipulationType === 'rotate' }
          setPrimitiveSize={setPrimitiveSize}
        />
      <MoveGizmo
          onCreate={onCreate}
          mouseInput={mouseInput}
          camera={camera}
          position={position}
          size={size}
          axisDimensionMap={axisDimensionMap}
          visible={ selected && manipulationType === 'move' }
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
