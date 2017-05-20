import React from 'react';
import {
  View,
  VrHeadModel,
  PointLight,
  AmbientLight
} from 'react-vr';
import StudioHelperGrids from './studio_helper_grids.js'
import BoxPreview from './box_preview.js'
import Objects from './objects.js'
import Hud from './hud.js'

export default class StudioViewport extends React.Component {

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

            <StudioHelperGrids />
            <Objects />
          </View>
        </View>
      </View>
    );
  }
};
