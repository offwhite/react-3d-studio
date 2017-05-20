import React from 'react';
import {
  View,
  Box
} from 'react-vr';

export default class BoxPreview extends React.Component {

  render() {
    return (
      <View>
        <Box
          dimWidth={2}
          dimDepth={2}
          dimHeight={1}
          style={{
            color: '#cccccc',
            transform: [
               {translate: [3, 0, 0]},
               {rotateY: 0},
               {rotateX: 0},
               {rotateZ: 0}
             ],
           }}
        />
        <Box
          dimWidth={2}
          dimDepth={2}
          dimHeight={1}
          wireframe
          style={{
            transform: [
               {translate: [3, 0, 0]},
               {rotateY: 0},
               {rotateX: 0},
               {rotateZ: 0}
             ],
           }}
        />
      </View>
    );
  }
};
