import React, {Component} from 'react'
import PropTypes from 'prop-types'
import * as THREE from 'three'
import MouseInput from '../lib/MouseInput'

import Primitive from './Primitives/Primitive'

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
  };

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
      showWireframe
    } = this.props

    return(
      <Primitive
        onCreate={onCreate}
        id={key}
        key={key}
        mouseInput={mouseInput}
        camera={camera}
        selectPrimitive={selectPrimitive}
        selected={selected}
        setPrimitivePosition={setPrimitivePosition}
        showWireframe={showWireframe}
        type={primitive.type}

        position={this.vector(primitive.position)}
        rotation={this.euler(primitive.rotation)}
        size={primitive.size}
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
