import React, {Component} from 'react'
import PrimitivesList from './PrimitivesList'
import PrimitiveEditForm from './PrimitiveEditForm'
import './ModificationPanel.css'

class ModificationPanel extends Component {

  render() {
    return (
      <div className='modificationPanel'>
        <PrimitivesList />
        <PrimitiveEditForm />
      </div>
    )
  }
}

export default ModificationPanel
