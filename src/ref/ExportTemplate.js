module.exports = {
  header: `

// paste this into your React VR component

import React from 'react'
  import {
    View,
    Box,
    Cylinder,
    Sphere
  } from 'react-vr'

  export default class React3dStudioModel extends React.Component {

  render() {
    return (
      <View
        ref="React3dStudio"
        style={{
          transform: [
                 {translate: [0, 0, 0]}
               ]
           }}
      >`,
  footer: `
      </View>
    )
  }
}`
}
