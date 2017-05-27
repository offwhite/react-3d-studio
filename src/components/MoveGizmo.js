import React from 'react';
import {
  VrButton,
  Cylinder
} from 'react-vr';

export default class MoveGizmo extends React.Component {

  startDrag() {
    console.log('drag started')
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
        onClick={()=>this.startDrag()}>
        <Cylinder
          dimWidth={width}
          dimDepth={depth}
          dimHeight={height}
          style={{
            layoutOrigin: [0, 0],
            color: color,
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
