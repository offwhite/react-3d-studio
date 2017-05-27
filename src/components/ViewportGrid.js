import React from 'react';
import {
  asset,
  View,
  Cylinder
} from 'react-vr';

export default class ViewportGrid extends React.Component {

  line(index, orientation, length){
    const scaledLength = length * 2

    return (
      <Cylinder
        key={`${orientation}${index}`}
        radiusTop={0.01}
        radiusBottom={0.01}
        dimHeight={scaledLength}
        segments={3}
        style={{
          color: '#cccccc',
          transform: [
             {translate: [(index * 2) - length, 0, 0]},
           ]
         }}
      />
    )
  }

  grid(orientation){

    const rotationX = orientation == 'x' ? 0 : 0
    const rotationY = orientation == 'y' ? 90 : 0
    const rotationZ = orientation == 'z' ? 90 : 0

    const length = 20

    return(
      <View style={{
        transform: [
          {rotateY: rotationX},
          {rotateX: rotationY},
          {rotateZ: rotationZ}
        ]
      }}>
        <View
          ref='vertical'
          style={{
            transform: [
              {rotateY: 0},
              {rotateX: 0},
              {rotateZ: 0}
            ],
          }}
        >
        {
           Array.from({length: (length + 1)}, (value, key) => key).map((i) => {
            return this.line(i, 'x', length)
          })
         }
        </View>
        <View
          ref='horizontal'
          style={{
            transform: [
              {rotateY: 0},
              {rotateX: 0},
              {rotateZ: 90}
            ],
          }}
        >
        {
           Array.from({length: length}, (value, key) => key).map((i) => {
            return this.line(i, 'x', length)
          })
         }
        </View>
      </View>
    )
  }

  render() {
    return (
      <View>
        {
          this.grid('y')
        }
      </View>
    );
  }
};
