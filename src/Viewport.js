import React from 'react'
import {connect} from 'react-redux'

import PureRenderMixin from 'react/lib/ReactComponentWithPureRenderMixin'
import React3 from 'react-three-renderer'
import * as THREE from 'three'
import './Studio.css'

import TrackballControls from './ref/TrackballControlls'
import MouseInput from './ref/MouseInput'

import ViewportActions from './redux/ViewportRedux'
import PrimitivesActions from './redux/PrimitivesRedux'

import Lights from './Components/Lights'
import Primitives from './Components/Primitives'

class Viewport extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      mouseInput: null,
      width: window.innerWidth - 300,
      height:window.innerHeight
    }

    // increate the manual throttle to throttle the app
    // higher number = more jitter, less PCU cycles.
    this.manualThrottle = 0
    this.manualThrottlePointer = 0
    this.control = false
  }

  shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate;

  // ==== LOAD ====

  componentDidMount() {
    const {
      camera,
      container
    } = this.refs;

    // this is for a test - remove it yeah?
    const { startApp } = this.props
    startApp()

    const controls = new TrackballControls(camera, container)

    controls.rotateSpeed = 4.0;
    controls.zoomSpeed = 1.2;
    controls.panSpeed = 0.8;
    controls.noZoom = false;
    controls.noPan = false;
    controls.staticMoving = true;
    controls.dynamicDampingFactor = 0.3;

    controls.zoom = 10;

    this.controls = controls;

    //this.controls.addEventListener('change', this._onTrackballChange)
    window.addEventListener("resize", this.updateScreenSize.bind(this))
    this._onAnimateInternal()
  }

  updateScreenSize(){
    this.setState({
      width: window.innerWidth - 300,
      height:window.innerHeight
    })
  }

  componentDidUpdate(newProps) {
    const { mouseInput } = this.refs

    mouseInput.containerResized()
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateScreenSize);
    this.controls.removeEventListener('change', this._onTrackballChange);
    this.controls.dispose();
    delete this.controls;
  }

  _onPrimitivesMounted = (primitives) => {
    this.primitives = primitives;
  };

  // ==== FRAME ====

  // we will get this callback every frame
  _onAnimate = () => {
    this.manualThrottlePointer++
    if(this.manualThrottlePointer > this.manualThrottle) {
      this._onAnimateInternal()
      this.manualThrottlePointer = 0
    }
  }

  _onAnimateInternal() {

    const { resetCamera, resetCameraComplete } = this.props

    const {
      mouseInput,
      camera,
      container,
      scene
    } = this.refs

    if (!mouseInput.isReady()) {
      mouseInput.ready(scene, container, camera)
      mouseInput.restrictIntersections(this.primitives)
      mouseInput.setActive(false)
    }

    // ---- set state ----

    if (this.state.mouseInput !== mouseInput)
      this.setState({mouseInput})

    if (this.state.camera !== camera)
      this.setState({camera})

    if (this.state.container !== container)
      this.setState({container})

    if (this.state.scene !== scene)
      this.setState({scene})

    this.controls.update()

    if (resetCamera){
      this.controls.reset()
      resetCameraComplete()
    }

  }

  // ===== EVENTS =====

  // ===== RENDER =====

  render() {

    const {
      mouseInput,
      camera,
      scene,
      container,
      width,
      height
    } = this.state

    const {
      cameraState,
      lightState,
      shouldShowGrid,
      showWireframe,
      primitivesList,
      selectPrimitive,
      selectedPrimitiveId,
      setExplicitPosition,
      setExplicitRotation,
      setExplicitSize,
      manipulationType
    } = this.props

    return (
      <div
        className="viewportContainer"
        ref="container"
      >
        <React3
          ref='renderer'
          antialias
          mainCamera="mainCamera"
          width={width}
          height={height}
          onAnimate={this._onAnimate}
          gammaInput
          gammaOutput
          shadowMapEnabled
          shadowMapType={THREE.PCFShadowMap}
          clearColor={0x666666}
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
            far={8000}
            position={cameraState.position}
            rotation={cameraState.rotation}
          />

          <Lights lightState={lightState} />

          {
            shouldShowGrid && <gridHelper
              size={5000}
              step={50}
              colorGrid={0xff0000}
              colorCenterLine={'#ff0000'}
            />
          }

          <Primitives
            primitivesList={primitivesList}
            mouseInput={mouseInput}
            camera={camera}
            scene={scene}
            container={container}
            onPrimitivesMounted={this._onPrimitivesMounted}
            selectPrimitive={selectPrimitive}
            selectedPrimitiveId={selectedPrimitiveId}
            setExplicitPosition={setExplicitPosition}
            setExplicitRotation={setExplicitRotation}
            setExplicitSize={setExplicitSize}
            showWireframe={showWireframe}
            manipulationType={manipulationType}
          />
        </scene>
      </React3>
    </div>

    );
  }
}

const mapStateToProps = state => {
  return {
    resetCamera:         state.viewport.resetCamera,
    cameraState:         state.viewport.camera,
    lightState:          state.viewport.light,
    shouldShowGrid:      state.viewport.shouldShowGrid,
    showWireframe:       state.viewport.showWireframe,
    primitivesList:      state.primitives.primitivesList,
    selectedPrimitiveId: state.primitives.selectedPrimitiveId,
    manipulationType:    state.viewport.manipulationType
  }
}

const mapDispatchToProps = (dispatch) =>{
  return {
    startApp: () => dispatch(ViewportActions.startApp()),
    resetCameraComplete: () =>
      dispatch(ViewportActions.resetCameraComplete()),
    setExplicitPosition: (position) =>
      dispatch(PrimitivesActions.setExplicitPosition(position)),
    setExplicitRotation: (rotation) =>
      dispatch(PrimitivesActions.setExplicitRotation(rotation)),
    setExplicitSize: (size) =>
      dispatch(PrimitivesActions.setExplicitSize(size)),
    selectPrimitive: (primitiveId) =>
      dispatch(PrimitivesActions.selectPrimitive(primitiveId))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Viewport)
