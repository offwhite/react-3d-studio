import React, {Component} from 'react'
import {Provider} from 'react-redux'
import createStore from './redux/index'

import Viewport from './Viewport'
import Menu from './Menu'

class Studio extends Component {
  render() {
    const store = createStore()

    return (
      <Provider store={store}>
        <div>
          <Viewport />
          <Menu />
        </div>
      </Provider>
    )
  }
}

export default Studio
