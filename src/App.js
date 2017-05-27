import React, {Component} from 'react'
import {Provider} from 'react-redux'
import Studio from './Studio'
import createStore from './redux/index'

class App extends Component {
  render() {
    const store = createStore()

    return (
      <Provider store={store}>
        <Studio />
      </Provider>
    )
  }
}

export default App
