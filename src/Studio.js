import React, {Component} from 'react'
import {Provider} from 'react-redux'
import createStore from './redux/index'

import Viewport from './Viewport'
import Menu from './Menu'
import ModificationPanel from './ModificationPanel/ModificationPanel'

// modification panel
// - spinners for THE NINE
// - set color, name, delete, select, toggle view, toggle wireframe?

class Studio extends Component {
  render() {
    const store = createStore()

    return (
      <Provider store={store}>
        <div className='studio'>
          <Viewport />
          <Menu />
          <ModificationPanel />
        </div>
      </Provider>
    )
  }
}

export default Studio
