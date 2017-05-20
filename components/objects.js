import React from 'react';
import {
  AppRegistry,
  asset,
  View,
  Box,
  NativeModules
} from 'react-vr';
import {connect} from 'react-redux'

import StudioActions from '../redux/StudioRedux'
import BoxPreview from './box_preview.js'

class Objects extends React.Component {
  constructor(props) {
      super(props);
      // Toggle the state every second
      this.state = {}
      setInterval(() => {
        this.setState({ showText: !this.state.showText });
      }, 1000);
    }

  componentDidMount() {
    react = this
    window.setInterval(function() {
      react.props.exportFile()
      const CubeModule = NativeModules.CubeModule
      const {exportedFile} = react.props
      CubeModule.changeCubeColor(exportedFile).then((res) => {
        const {x, y, z, width, height, depth, rotationX, rotationY, rotationZ, exportedFile} = react.props
        const rotationAmount = 5
        res.forEach(function (value) {
          if (value.action === 'Add') {
            react.props.addBox()
          } else if (value.action === 'Remove') {
            react.props.removeBox()
          } else if (value.action === 'MoveXPlus') {
            react.props.transformBox({x: x+1})
          } else if (value.action === 'MoveXMinus') {
            react.props.transformBox({x: x-1})
          }else if (value.action === 'MoveYPlus') {
            react.props.transformBox({y: y+1})
          } else if (value.action === 'MoveYMinus') {
            react.props.transformBox({y: y-1})
          }else if (value.action === 'MoveZMinus') {
            react.props.transformBox({z: z-1})
          }else if (value.action === 'MoveZPlus') {
            react.props.transformBox({z: z+1})
          } else if (value.action === 'WidthPlus') {
            react.props.transformBox({width: width+1})
          } else if (value.action === 'WidthMinus') {
            react.props.transformBox({width: width-1})
          } else if (value.action === 'HeightPlus') {
            react.props.transformBox({height: height+1})
          } else if (value.action === 'HeightMinus') {
            react.props.transformBox({height: height-1})
          } else if (value.action === 'DepthPlus') {
            react.props.transformBox({depth: depth+1})
          } else if (value.action === 'DepthMinus') {
            react.props.transformBox({depth: depth-1})
          } else if (value.action === 'RotateXPlus') {
            react.props.transformBox({rotationX: rotationX+rotationAmount})
          } else if (value.action === 'RotateXMinus') {
            react.props.transformBox({rotationX: rotationX-rotationAmount})
          } else if (value.action === 'RotateYPlus') {
            react.props.transformBox({rotationY: rotationY+rotationAmount})
          } else if (value.action === 'RotateYMinus') {
            react.props.transformBox({rotationY: rotationY-rotationAmount})
          } else if (value.action === 'RotateZPlus') {
            react.props.transformBox({rotationZ: rotationZ+rotationAmount})
          } else if (value.action === 'RotateZMinus') {
            react.props.transformBox({rotationZ: rotationZ-rotationAmount})
          }
          console.log(value)
        })
      })
    }, 100)
  }

  renderBox(box, i) {

    const {x, y, z, width, height, depth, rotationX, rotationY, rotationZ} = box

    return (
      <BoxPreview
        width={width}
        depth={depth}
        height={height}
        rotationX={rotationX}
        rotationY={rotationY}
        rotationZ={rotationZ}
        translationX={x}
        translationY={y}
        translationZ={z}
        key={i}
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
  exportedFile: state.studio.exportFile,
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
    removeBox: () => dispatch(StudioActions.removeCurrentBox()),
    exportFile: () => dispatch(StudioActions.exportFile())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Objects)
