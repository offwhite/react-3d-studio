import React from 'react';
import {
  View,
  Box
} from 'react-vr';

export default class BoxPreview extends React.Component {

  render() {
    const {
      width,
      height,
      depth,
      rotationX,
      rotationY,
      rotationZ,
      translationX,
      translationY,
      translationZ
    } = this.props
    return (
      <View>
        <Box
          dimWidth={width}
          dimDepth={depth}
          dimHeight={height}
          style={{
            layoutOrigin: [0, 0],
            color: '#cccccc',
            transform: [
               {translate: [
                 translationX,
                 translationY,
                 translationZ
               ]},
               {rotateY: rotationY},
               {rotateX: rotationX},
               {rotateZ: rotationZ}
             ],
           }}
        />
        <Box
        dimWidth={width}
        dimDepth={depth}
        dimHeight={height}
        wireframe
        style={{
          layoutOrigin: [0, 0],
          transform: [
             {translate: [
               translationX,
               translationY,
               translationZ
             ]},
             {rotateY: rotationY},
             {rotateX: rotationX},
             {rotateZ: rotationZ}
           ],
         }}
        />
      </View>
    );
  }
};
