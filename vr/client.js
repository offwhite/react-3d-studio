// Auto-generated content.
// This file contains the boilerplate to set up your React app.
// If you want to modify your application, start in "index.vr.js"

// Auto-generated content.
import {VRInstance, Module} from 'react-vr-web';
class CubeModule extends Module {
    constructor() {
          super('CubeModule');
        }
    init(context) {
      this._rnctx = context;
        }
  $changeCubeColor(val, success, fail) {
    this._rnctx.invokeCallback(success, [window.getQueue()]);
  }
}

function init(bundle, parent, options) {
  const cubeModule = new CubeModule();
  const vr = new VRInstance(bundle, 'Studio', parent, {
    // Add custom options here
    nativeModules: [ cubeModule ],
    ...options,
  });
  cubeModule.init(vr.rootView.context);
  vr.render = function() {
    // Any custom behavior you want to perform on each frame goes here
  };
  // Begin the animation loop
  vr.start();
  return vr;
}

window.ReactVR = {init};
