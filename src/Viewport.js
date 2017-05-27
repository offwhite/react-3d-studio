import React, { Component } from 'react'
import {connect} from 'react-redux'

import PureRenderMixin from 'react/lib/ReactComponentWithPureRenderMixin';
import React3 from 'react-three-renderer'
import './Studio.css'

import TrackballControls from './ref/TrackballControlls';
import MouseInput from './ref/MouseInput';

import ViewportActions from './redux/ViewportRedux'
import PrimitivesActions from './redux/PrimitivesRedux'

import Lights from './Components/Lights'
import Primitives from './Components/Primitives'

class Viewport extends React.Component {

  // notes:
  // 1. [done] move lighting to a lighting component
  // 2. [not doing] place camera control into a component
  // 3. [done] allow camera reset
  // 4. add orientation grid
  // 5. [done] move mesh into component
  // 6. look at axis helper
  // 7. grid helper


  constructor(props, context) {
    super(props, context);

    this.state = {
      mouseInput: null,
      width: window.innerWidth,
      height:window.innerHeight
    }

    // construct the position vector here, because if we use 'new' within render,
    // React will think that things have changed when they have not.
  }

  // ==== LOAD ====

  componentDidMount() {
    const {
      camera,
    } = this.refs;

    // this is for a test - remove it yeah?
    const { startApp } = this.props
    startApp()

    const controls = new TrackballControls(camera);

    controls.rotateSpeed = 4.0;
    controls.zoomSpeed = 1.2;
    controls.panSpeed = 0.8;
    controls.noZoom = false;
    controls.noPan = false;
    controls.staticMoving = true;
    controls.dynamicDampingFactor = 0.3;

    controls.zoom = 10;

    this.controls = controls;

    this.controls.addEventListener('change', this._onTrackballChange);
  }

  componentDidUpdate(newProps) {
    const {
      mouseInput,
    } = this.refs;

    const {
      width,
      height,
    } = this.props

    if (width !== newProps.width || height !== newProps.height) {
      mouseInput.containerResized();
    }
  }

  componentWillUnmount() {
    this.controls.removeEventListener('change', this._onTrackballChange);
    this.controls.dispose();
    delete this.controls;
  }

  _onPrimitivesMounted = (primitives) => {
    this.primitives = primitives;
  };

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

      console.log(this.primitives)

      mouseInput.ready(scene, container, camera)
      mouseInput.restrictIntersections(this.primitives);
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
    // dispatch this shit yeah?
    const {setCamera} = this.props
    setCamera(
      this.refs.camera.position.clone(),
      this.refs.camera.rotation.clone()
    )
  };

  // ===== RENDER =====

  render() {

    const {
      mouseInput,
      camera,
      width,
      height
    } = this.state;

    const {
      cameraState,
      lightState,
      primitivesList,
      selectPrimitive,
      selectedPrimitiveId
    } = this.props

    return (
      <div
        ref="container"
      >
        <React3
        antialias
        mainCamera="mainCamera"
        width={width}
        height={height}
        onAnimate={this._onAnimate}
        gammaInput
        gammaOutput
        shadowMapEnabled
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
            position={cameraState.position}
            rotation={cameraState.rotation}
          />
          <Lights lightState={lightState} />
          <Primitives
            primitivesList={primitivesList}
            mouseInput={mouseInput}
            camera={camera}
            onPrimitivesMounted={this._onPrimitivesMounted}
            selectPrimitive={selectPrimitive}
            selectedPrimitiveId={selectedPrimitiveId}
          />
        </scene>
      </React3>
    </div>

    );
  }
}

const mapStateToProps = state => {
  return {
    cameraState:         state.viewport.camera,
    lightState:          state.viewport.light,
    primitivesList:      state.primitives.primitivesList,
    selectedPrimitiveId: state.primitives.selectedPrimitiveId
  }
}

const mapDispatchToProps = (dispatch) =>{
  return {
    startApp: () => dispatch(ViewportActions.startApp()),
    setCamera: (cameraPosition, cameraRotation) =>
      dispatch(ViewportActions.setCamera(cameraPosition, cameraRotation)),
    selectPrimitive: (primitiveId) => dispatch(PrimitivesActions.selectPrimitive(primitiveId))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Viewport)