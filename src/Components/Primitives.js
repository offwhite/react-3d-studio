import React, {Component} from 'react'
import * as THREE from 'three'

import Box from './Primitives/Box'
import Sphere from './Primitives/Sphere'

class Primitives extends Component {

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
    this.primitives[index] = primitives;
  };

  vector(position) {
    return new THREE.Vector3(position.x, position.y, position.z)
  }

  euler(rotation) {
    return new THREE.Euler( rotation.x, rotation.y, rotation.z, 'XYZ' )
  }

  renderBox(primitive, key, onCreate, selected) {
    const { mouseInput, camera, selectPrimitive } = this.props
    return(
      <Box
        onCreate={onCreate}
        id={key}
        key={key}
        mouseInput={mouseInput}
        camera={camera}
        selectPrimitive={selectPrimitive}
        position={this.vector(primitive.position)}
        rotation={this.euler(primitive.rotation)}
        size={primitive.size}
        color={primitive.color}
        selected={selected}
      />
    )
  }

  renderSphere(primitive, key, onCreate) {
    const { mouseInput, camera } = this.props
    return(
      <Sphere
        onCreate={onCreate}
        id={key}
        key={key}
        mouseInput={mouseInput}
        position={this.vector(primitive.position)}
        rotation={this.euler(primitive.rotation)}
        radius={primitive.radius}
        color={primitive.color}
        selected={false}
        key={key}
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
            const selected = (selectedPrimitiveId == key)
            return {
              'box':    this.renderBox(primitive, key, onCreate, selected),
              'sphere': this.renderSphere(primitive, key, onCreate, selected),
            }[primitive.type]
          })
        }
      </group>
    )
  }
}

export default Primitives
