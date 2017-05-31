import React, {Component} from 'react'
import PropTypes from 'prop-types'
import * as THREE from 'three'
import MouseInput from '../ref/MouseInput'

import Primitive from './Primitive'

class Primitives extends Component {

  static propTypes() {
    return {
      primitivesList:       PropTypes.object.isRequired,
      mouseInput:           PropTypes.instanceOf(MouseInput),
      camera:               PropTypes.instanceOf(THREE.PerspectiveCamera),

      onPrimitivesMounted:  PropTypes.func.isRequired,
      selectPrimitive:      PropTypes.func.isRequired,
      selectedPrimitiveId:  PropTypes.integer.isRequired,
      setPrimitivePosition: PropTypes.func.isRequired,
      setPrimitiveSize:     PropTypes.func.isRequired,
      manipulationType:     PropTypes.string.isRequired
    }
  }

  constructor(props, context) {
    super(props, context);

    const primitives = []
    //primitives.length = state.primitives.length
    this.primitives = primitives
  }

  componentDidMount() {
    const {
      onPrimitivesMounted,
    } = this.props;

    onPrimitivesMounted(this.primitives);
  }

  _onPrimitivesCreate = (index, primitives) => {
    this.primitives[this.primitives.length] = primitives
  }

  _onPrimitivesDestroy = () => {
    // look at updating the primitives list here. i think that's
    // why MI is fucked on new objects created after a deletion.
    console.log('destroy', this.primitives)
  }

  vector(position) {
    return new THREE.Vector3(position.x, position.y, position.z)
  }

  euler(rotation) {
    return new THREE.Euler( rotation.x, rotation.y, rotation.z, 'XYZ' )
  }

  renderPrimitive(primitive, key, onCreate, selected) {
    const {
      mouseInput,
      camera,
      selectPrimitive,
      setPrimitivePosition,
      setPrimitiveSize,
      showWireframe,
      manipulationType
    } = this.props

    return(
      <Primitive
        onCreate={onCreate}
        onDestroy={this._onPrimitivesDestroy}
        id={key}
        key={key}
        mouseInput={mouseInput}
        camera={camera}
        selectPrimitive={selectPrimitive}
        selected={selected}
        setPrimitivePosition={setPrimitivePosition}
        setPrimitiveSize={setPrimitiveSize}
        showWireframe={showWireframe}
        manipulationType={manipulationType}
        type={primitive.type}

        position={this.vector(primitive.position)}
        rotation={this.euler(primitive.rotation)}
        size={primitive.size}
        axisDimensionMap={primitive.axisDimensionMap}
        color={primitive.color}
      />
    )
  }

  render() {

    const {primitivesList, selectedPrimitiveId} = this.props

    return (
      <group>
        {
          primitivesList.map((primitive, key) => {
            const onCreate = this._onPrimitivesCreate.bind(this, key);
            const selected = (selectedPrimitiveId === key)
            return this.renderPrimitive(primitive, key, onCreate, selected)
          })
        }
      </group>
    )
  }
}

export default Primitives
