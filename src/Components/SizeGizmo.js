import React, {Component} from 'react'
import PropTypes from 'prop-types'
import * as THREE from 'three'
import MouseInput from '../ref/MouseInput';

// shared plane for dragging purposes
// it's good to share because you can drag only one primitive at a time
const dragPlane = new THREE.Plane()
const backVector = new THREE.Vector3(0, 0, -1)

class SizeGizmo extends Component {

  static propTypes() {
    return {
      onCreate:             PropTypes.func.isRequired,
      mouseInput:           PropTypes.instanceOf(MouseInput),
      camera:               PropTypes.instanceOf(THREE.PerspectiveCamera),

      position:             PropTypes.object.isRequired,
      rotation:             PropTypes.object.isRequired,
      size:                 PropTypes.object.isRequired,
      axisDimensionMap:     PropTypes.object.isRequired,

      visible:              PropTypes.boolean.isRequired,
      setPrimitiveSize:     PropTypes.func.isRequired,
    }
  }

  constructor(props, context) {
    super(props, context);

    this.overlap = 100
    this.shaftRadius = 1
    this.headDimensions = 40
    this.activeAxis = 'x'
  }

  componentWillUnmount() {
    document.removeEventListener('mouseup', this._onDocumentMouseUp);
  }

  /* ------------ Helpers ---------- */

  vector(position) {
    return new THREE.Vector3(position.x, position.y, position.z)
  }

  euler(rotation) {
    return new THREE.Euler( rotation.x, rotation.y, rotation.z, 'XYZ' )
  }

  getShaftLength = (axis) => {
    const {size, axisDimensionMap} = this.props
    const dimension = axisDimensionMap[axis]
    const totalSize = ((size[dimension]))
    if(dimension == 'radius'){
      return (totalSize + this.overlap)
    }
    return ((totalSize / 2) + this.overlap)
  }

  /* ---------- LIFES A DRAG ------------ */

  _onMouseDown = (event, intersection, axis) => {
    const { visible, camera, position, size } = this.props

    event.preventDefault()
    event.stopPropagation()

    if (!visible)
      return false

    // orientate the drag plane
    this.activeAxis = axis

    const planeEuler = {
      x: this.euler({x: 0, y: 0, z: 1.57}),
      y: this.euler({x: 0, y: 0, z: 1.57}),
      z: this.euler({x: 1.57, y: 0, z: 0})
    }[axis]

    dragPlane.setFromNormalAndCoplanarPoint(
      backVector.clone().applyEuler(planeEuler),
      intersection.point
    )

    // get the distance of the virtual cursor to the primitive origin
    this.dragStart = intersection.point.clone()
    this.startingSize = size

    document.addEventListener('mouseup', this._onDocumentMouseUp)
    document.addEventListener('mousemove', this._onDocumentMouseMove)
  }

  _onDocumentMouseMove = (event) => {
    event.preventDefault();

    const {
      mouseInput,
      size,
      position,
      setPrimitiveSize,
      axisDimensionMap
    } = this.props;

    const ray:THREE.Ray = mouseInput.getCameraRay(new THREE
      .Vector2(event.clientX, event.clientY));

    // raycast at the drag plane
    const intersection = dragPlane.intersectLine(new THREE.Line3(
      ray.origin,
      ray.origin.clone()
        .add(ray.direction.clone().multiplyScalar(10000))
    ))

    // does the ray intersect with the drag plane? Hope so.
    if (intersection) {
      const delta = intersection.clone().sub(this.dragStart)

      const dimension = axisDimensionMap[this.activeAxis]

      const newSize = (this.startingSize[dimension] + delta[this.activeAxis])

      setPrimitiveSize(newSize, dimension)
    }
  }

  _onDocumentMouseUp = (event) => {
    event.preventDefault();

    document.removeEventListener('mouseup', this._onDocumentMouseUp)
    document.removeEventListener('mousemove', this._onDocumentMouseMove)
  }

  /* -------------- Render ------------- */


  _ref = (mesh) => {
    const {onCreate} = this.props
    onCreate(mesh)
  };

  renderArrow(position, axis, color) {

    const {visible} = this.props

    const shaftLength = this.getShaftLength(axis)

    const rotation = {
      x: this.euler({x: 0, y: 0, z: -1.57}),
      y: this.euler({x: 0, y: 0, z: 0}),
      z: this.euler({x: 1.57, y: 0, z: 0}),
    }[axis]

    return (
      <group
        rotation={rotation}
        visible={visible}
        visible={visible}
      >
        <mesh
          name={'head'}
          castShadow={false}
          receiveShadow={false}
          position={this.vector({x: 0, y: shaftLength, z: 0})}
          visible={visible}

          onMouseEnter={this._onMouseEnter}
          onMouseDown={(event, intersection) => {this._onMouseDown(event, intersection, axis)}}
          onMouseLeave={this._onMouseLeave}
          ref={this._ref}
        >
        <boxGeometry
          width={this.headDimensions}
          depth={this.headDimensions}
          height={this.headDimensions}
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

    const {position, rotation} = this.props

    return (
      <group
        position={position}
        rotation={rotation}
      >
        { this.renderArrow(position, 'x', '#ff0000') }
        { this.renderArrow(position, 'y', '#00ff00') }
        { this.renderArrow(position, 'z', '#0000ff') }
      </group>
    )
  }
}

export default SizeGizmo
