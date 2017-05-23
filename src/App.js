import React, { Component } from 'react'
import PureRenderMixin from 'react/lib/ReactComponentWithPureRenderMixin';
import React3 from 'react-three-renderer'
import * as THREE from 'three'
import './App.css'

import TrackballControls from './ref/TrackballControlls';
import MouseInput from './ref/MouseInput';

class App extends Component {

  // notes:
  // 1. move lighting to a lighting component
  // 2. place camera control into a component
  // 3. allow camera reset


  constructor(props, context) {
    super(props, context);

    this.state = {
      cameraPosition: new THREE.Vector3(0, 0, 1000),
      cameraRotation: new THREE.Euler(),
      cubeRotation: new THREE.Euler( 0, 45, 45, 'XYZ' ),
      lightPosition: new THREE.Vector3(0, 500, 2000),
      lightTarget: new THREE.Vector3(0, 0, 0),
      mouseInput: null,
    };

    this.cameraPosition = new THREE.Vector3(0, 0, 5)

    // construct the position vector here, because if we use 'new' within render,
    // React will think that things have changed when they have not.
  }

  // ==== LOAD ====

  componentDidMount() {
    const {
      container,
      camera,
    } = this.refs;

    const controls = new TrackballControls(camera);

    controls.rotateSpeed = 5.0;
    controls.zoomSpeed = 1.2;
    controls.panSpeed = 0.8;
    controls.noZoom = false;
    controls.noPan = false;
    controls.staticMoving = true;
    controls.dynamicDampingFactor = 0.3;

    this.controls = controls;

    this.controls.addEventListener('change', this._onTrackballChange);
  }

  // ==== FRAME ====

  _onAnimate = () => {
    // we will get this callback every frame
    this._onAnimateInternal()
  };

  _onAnimateInternal() {
    const {
      mouseInput,
      camera,
    } = this.refs;

    if (!mouseInput.isReady()) {
      const {
        scene,
        container,
      } = this.refs;

      mouseInput.ready(scene, container, camera)
      mouseInput.restrictIntersections(this.cubes)
      mouseInput.setActive(false)
    }

    if (this.state.mouseInput !== mouseInput)
      this.setState({mouseInput})

    if (this.state.camera !== camera)
      this.setState({camera})

    this.controls.update();
  }

  // ===== EVENTS =====

  _onTrackballChange = () => {
    this.setState({
      cameraPosition: this.refs.camera.position.clone(),
      cameraRotation: this.refs.camera.rotation.clone(),
    });
  };

  // ===== RENDER =====

  render() {

    // or you can use:
    const width = window.innerWidth
    const height = window.innerHeight

    const {
      cameraPosition,
      cameraRotation,
      lightPosition,
      lightTarget
    } = this.state

    return (
      <div
        ref="container"
      >
        <React3
        mainCamera="mainCamera"
        width={width}
        height={height}

        onAnimate={this._onAnimate}
      >
        <module
          ref="mouseInput"
          descriptor={MouseInput}
        />
        <scene ref="scene">
          <perspectiveCamera
            ref='camera'
            name="mainCamera"
            fov={75}
            aspect={width / height}
            near={0.1}
            far={2000}
            position={cameraPosition}
            rotation={cameraRotation}
          />
          <ambientLight
            color={0x505050}
          />
          <spotLight
            color={0xffffff}
            intensity={0.5}
            position={lightPosition}
            lookAt={lightTarget}

            castShadow
            shadowCameraNear={200}
            shadowCameraFar={10000}
            shadowCameraFov={50}

            shadowBias={-0.00022}

            shadowMapWidth={2048}
            shadowMapHeight={2048}
          />

          <mesh
            castShadow
            receiveShadow
            rotation={this.state.cubeRotation}
          >
            <boxGeometry
              width={100}
              height={100}
              depth={100}
            />
            <meshLambertMaterial
              color={0xcccccc}
            />
          </mesh>
        </scene>
      </React3>
    </div>

    );
  }
}

export default App;
