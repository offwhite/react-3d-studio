import React from 'react';
import {connect} from 'react-redux'
import {
  View,
  VrHeadModel,
  PointLight,
  AmbientLight
} from 'react-vr';
import ViewportGrid from './ViewportGrid.js'
import EditablePrimitives from './EditablePrimitives.js'

class StudioViewport extends React.Component {

  constructor() {
    super();
    this.state = {
      rotation: {
        y: 0,
        x: 0,
        z: 0
      }
    }
    this.rotate = this.rotate.bind(this);
  }

  componentDidMount() {
    this.rotate();
  }

  componentWillUnmount() {
    if (this.frameHandle) {
      cancelAnimationFrame(this.frameHandle);
      this.frameHandle = null;
    }
  }

  degrees(radians) {
    return radians * 180 / Math.PI;
  }

  zoom() {
    const {zoom} = this.props
    scale = 1 + (zoom / 10)
    if (scale < 0.1)
      scale = 0.1
    return 1 + (zoom / 10)
  }

  rotate() {
    radians = VrHeadModel.rotationOfHeadMatrix()

    this.setState({
  	 	rotation: {
        x: this.degrees(radians[0]),
        y: this.degrees(radians[1]),
        z: this.degrees(radians[2])
      }
  	})

    this.frameHandle = requestAnimationFrame(this.rotate)
  }

  render() {

    const {zoom} = this.props
    return (
      <View
        ref="StudioRoot"
        style={{
          transform: [
                 {translate: [0, -0.5, 0]},
                 {rotateY: this.state.rotation.y},
                 {rotateX: this.state.rotation.x},
                 {rotateZ: this.state.rotation.z}
               ],
           }}
      >
        <View
          ref="StudioGimbalY"
          style={{
            transform: [
                   {translate: [0, 0, -10]},
                   {rotateY: 0},
                   {rotateX: -this.state.rotation.x},
                   {rotateZ: 0}
                 ],
             }}
        >
          <View
            ref="StudioGimbalX"
            style={{
              transform: [
                 {scale: this.zoom() },
                 {translate: [0, 0, 0]},
                 {rotateY: -this.state.rotation.y},
                 {rotateX: 0},
                 {rotateZ: 0}
               ],
               }}
          >



            <AmbientLight
              intensity={.2}
              style={{
                transform: [
                   {translate: [-50, -50, -50]}
                 ]
                 }}
            />

            <PointLight
              intensity={2.3}
              distance={150}
              decay={2}
              style={{
                transform: [
                   {translate: [50, 50, 50]}
                 ]
                 }}
            />

          <ViewportGrid />
            <EditablePrimitives />
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    zoom: state.studio.zoom
  }
}

export default connect(mapStateToProps)(StudioViewport)