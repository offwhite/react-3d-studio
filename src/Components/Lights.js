import React, {Component} from 'react'
import {connect} from 'react-redux'


class Lights extends Component {

  render() {
    const {lightState} = this.props

    return (
      <scene>
        <ambientLight
          color={lightState.ambient.color}
        />
        <spotLight
          color={lightState.spotlight.color}
          intensity={lightState.spotlight.intensity}
          position={lightState.spotlight.position}
          lookAt={lightState.spotlight.target}

          castShadow
          shadowCameraNear={200}
          shadowCameraFar={10000}
          shadowCameraFov={50}

          shadowBias={-0.00022}

          shadowMapWidth={4096}
          shadowMapHeight={4096}
        />
      </scene>
    )
  }
}

export default Lights
