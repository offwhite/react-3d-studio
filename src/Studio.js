import React, {Component} from 'react'
import {Provider} from 'react-redux'
import createStore from './redux/index'

import Viewport from './Viewport'
import Menu from './Menu'
import ModificationPanel from './ModificationPanel/ModificationPanel'

// modification panel
// - set ~color~, ~name~, delete, ~select~, toggle view, toggle wireframe?
// so there's a couple of choices with intersection objects - firslty, look at the Primitives.primitives, see what's in there
// an alternative would be to completely wipe all existing primitives, clear the intersectins array in MI, then populate the state again.
// kinda a clear and reset.

// rotation gizmo - that's gonna be tough
// maybe wrap all primitives in a group, set the position on the group, then offset an
// inner group by half the height. that'd put the origin point at one end.
// set radius on x as well

// put size into its own reducer

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
