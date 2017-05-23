import React from 'react';
import {
  VrButton,
  Box
} from 'react-vr';

export default class BoxPreview extends React.Component {

  selectBox() {
    console.log('box selected')
  }

  render() {
    const {
      selected,
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

    const color = selected ? '#66cc66' : '#cccccc'

    return (
      <VrButton
        onClick={()=>this.selectBox()}>
        <Box
          dimWidth={width}
          dimDepth={depth}
          dimHeight={height}
          style={{
            layoutOrigin: [0, 0],
            color: color,
            // change this to a transform matrix: https://facebook.github.io/react-vr/docs/3dcoordinates-and-transforms.html#transform-properties
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
      </VrButton>
    );
  }
};
