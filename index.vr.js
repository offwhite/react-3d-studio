import React, {Component} from 'react'
import {Provider} from 'react-redux'
import StudioViewport from './components/StudioViewport.js'
import createStore from './redux/index'
import {AppRegistry} from 'react-vr';

class Studio extends Component {
  render() {
    const store = createStore()

    return (
      <Provider store={store}>
        <StudioViewport />
      </Provider>
    )
  }
}

export default Studio

AppRegistry.registerComponent('Studio', () => Studio);
