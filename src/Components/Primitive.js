import React, {Component} from 'react'
import PropTypes from 'prop-types'
import * as THREE from 'three'
import MouseInput from '../ref/MouseInput'

import TransformControls from 'three-transformcontrols'

class Primitive extends Component {

  static propTypes() {
    return {
      onCreate:             PropTypes.func.isRequired,
      onDestroy:            PropTypes.func.isRequired,
      id:                   PropTypes.integer.isRequired,
      container:            PropTypes.object.isRequired,
      scene:                PropTypes.object.isRequired,
      mouseInput:           PropTypes.instanceOf(MouseInput),
      camera:               PropTypes.instanceOf(THREE.PerspectiveCamera),
      setPrimitivePosition: PropTypes.func.isRequired,
      setExplicitSize:      PropTypes.func.isRequired,
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

  constructor(props, context) {
    super(props, context)
    this.control = false
    this.primitiveRotation = false
    this.primitivePosition = false
    this.primitiveScale = {x: 1, y: 1, z: 1}
  }

  componentWillUnmount = () => {
    const { onDestroy, mouseInput } = this.props
    mouseInput.flagClearIntersetions()
    onDestroy()
  }

  componentDidUpdate(newProps) {
    this.updateController()
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
    event.preventDefault()
    event.stopPropagation()
  }

  _onMouseDown = (event, intersection) => {
    const {id, selectPrimitive, selected, showWireframe} = this.props
    event.preventDefault()
    event.stopPropagation()

    if(!selected){
      selectPrimitive(id)
      this.controllerInit(this.mesh)
    }
  }

  _onMouseLeave = (event, intersection) => {
    event.preventDefault()
    event.stopPropagation()
  }

  _ref = (mesh) => {
    const {onCreate} = this.props
    onCreate(mesh)
    this.controllerInit(mesh)
  }

  deselect(){
    const { scene } = this.props

    if(this.control === false)
      return

    this.control.removeEventListener( 'change', this.updatePrimitive)
    this.control.detach(this.mesh)
    scene.remove(this.control)
    this.control = false
    return
  }

  /* -- Transform controller ------- */

  controllerInit(mesh) {
    if (this.control !== false)
      return

    this.mesh = mesh

    const {
      scene,
      camera,
      container
    } = this.props

    // add controls
    this.control = new TransformControls( camera, container )
    scene.add(this.control)
    this.control.attach(mesh)
    this.control.addEventListener( 'change', this.updatePrimitive.bind(this) )

    // set defaults
    this.primitiveRotation = this.mesh.rotation
  }


  updateController(){
    const { manipulationType } = this.props

    if(
      this.control === false ||
      this.control.getMode === manipulationType
    )
      return

    this.control.setMode( manipulationType )
  }

  updatePrimitive(){
    const {
      setExplicitPosition,
      setExplicitRotation,
      setExplicitSize,
      selected,
      size
    } = this.props

    if(!selected){
      this.deselect()
      return
    }

    if(
      this.primitivePosition.x !== this.mesh.position.x ||
      this.primitivePosition.y !== this.mesh.position.y ||
      this.primitivePosition.z !== this.mesh.position.z
    ){
      setExplicitPosition(this.mesh.position)
      this.primitivePosition = this.mesh.position.clone()
    }

    if(
      this.primitiveRotation._x !== this.mesh.rotation._x ||
      this.primitiveRotation._y !== this.mesh.rotation._y ||
      this.primitiveRotation._z !== this.mesh.rotation._z
    ){
      const newRotation = {
        x: this.mesh.rotation._x,
        y: this.mesh.rotation._y,
        z: this.mesh.rotation._z
      }
      setExplicitRotation(newRotation)
      this.primitiveRotation = this.mesh.rotation.clone()
    }

    if(
      this.primitiveScale.x !== this.mesh.scale.x ||
      this.primitiveScale.y !== this.mesh.scale.y ||
      this.primitiveScale.z !== this.mesh.scale.z
    ){
      const newSize = {
        width: this.cleanScale(size.width + this.mesh.scale.x - this.primitiveScale.x),
        height: this.cleanScale(size.height + this.mesh.scale.y - this.primitiveScale.y),
        depth: this.cleanScale(size.depth + this.mesh.scale.z - this.primitiveScale.z)
      }
      setExplicitSize(newSize)
      this.mesh.scale.set( 1, 1, 1 )
      this.primitiveScale = this.mesh.scale.clone()
    }
  }

  cleanScale(scale){
    if(scale > 2000)
      return 2000
    return scale < 1 ? 1 : scale
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
      axisDimensionMap,
      color,
      selected,
      showWireframe,
      manipulationType
    } = this.props

    const _color = selected ? this.selectedColor() : color

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
