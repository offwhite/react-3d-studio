import React, {Component} from 'react'
import {Provider} from 'react-redux'
import createStore from './redux/index'

import Viewport from './Viewport'
import Menu from './Menu'
import KeyboardShortcuts from './KeyboardShortcuts'
import ModificationPanel from './ModificationPanel/ModificationPanel'
import PrimitivesExport from './ModificationPanel/PrimitivesExport'

// modification panel
// look at delete methods

// sort out the propagation issue on transform gizmo
// sort ui
// add export
// bundle

// increase the number of primitives
// - add pano


class Studio extends Component {
  render() {
    const store = createStore()

    return (
      <Provider store={store}>
        <div className='studio'>
          <Viewport />
          <Menu />
          <ModificationPanel />
          <KeyboardShortcuts />
          <PrimitivesExport />
        </div>
      </Provider>
    )
  }
}

export default Studio
