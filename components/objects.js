import React from 'react';
import {
  AppRegistry,
  asset,
  View,
  Box,
} from 'react-vr';
import {connect} from 'react-redux'

import StudioActions from '../redux/StudioRedux'

class Objects extends React.Component {
  constructor(props) {
      super(props);
      // Toggle the state every second
      this.state = {}
      setInterval(() => {
        this.setState({ showText: !this.state.showText });
      }, 1000);
    }

  renderBox(box, i) {

    const {x, y, z, width, height, depth, rotationX, rotationY, rotationZ} = box

    return (
      <Box
        dimWidth={width}
        dimDepth={depth}
        dimHeight={height}
        wireframe={false}
        key={i}
        style={{
          layoutOrigin: [0, 0],
          transform: [
            {translate: [x, y, z]},
            {rotateX : rotationX},
            {rotateY : rotationY},
            {rotateZ : rotationZ},
          ]
        }}
      />
    )
  }

  render() {
    //console.log('props: ', this.props)

    const {boxes, transformBox, x, y, z, width, height, depth, rotationX, rotationY, rotationZ, addBox, removeBox} = this.props

    return (
      <View>
        {
          boxes.map((box, i) => {
            return this.renderBox(box, i)
          })
        }
      </View>
    );
  }
};

const mapStateToProps = state => {
  return {
  boxes: state.studio.boxes,
  x: state.studio.boxes.slice(-1)[0].x,
  y: state.studio.boxes.slice(-1)[0].y,
  z: state.studio.boxes.slice(-1)[0].z,
  width: state.studio.boxes.slice(-1)[0].width,
  depth: state.studio.boxes.slice(-1)[0].depth,
  height: state.studio.boxes.slice(-1)[0].height,
  rotationX: state.studio.boxes.slice(-1)[0].rotationX,
  rotationY: state.studio.boxes.slice(-1)[0].rotationY,
  rotationZ: state.studio.boxes.slice(-1)[0].rotationZ
  }
}

const mapDispatchToProps = dispatch => {
  return {
    transformBox: (attr) => dispatch(StudioActions.transformBox(attr)),
    addBox: () => dispatch(StudioActions.addBox()),
    removeBox: () => dispatch(StudioActions.removeCurrentBox())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Objects)
