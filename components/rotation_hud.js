import React from 'react';
import {
  AppRegistry,
  asset,
  Pano,
  Text,
  View,
  Box,
  VrButton
} from 'react-vr';

export default class RotationHud extends React.Component {
  render() {
    const {
      xPlusClicked,
      xMinusClicked,
      yPlusClicked,
      yMinusClicked,
      zPlusClicked,
      zMinusClicked
    } = this.props

    return (
      <View>
        <VrButton
          onClick={()=>xPlusClicked()}>
          <Text
            style={{
              backgroundColor:'blue',
              padding: 0.02,
              textAlign:'center',
              textAlignVertical:'center',
              fontSize: 0.2,
              layoutOrigin: [0.5, 0.5],
              transform: [{translate: [1, 2, -3]}], }}>
                rotx+
            </Text>
          </VrButton>

          <VrButton
            onClick={()=>xMinusClicked()}>
            <Text
              style={{
                backgroundColor:'red',
                padding: 0.02,
                textAlign:'center',
                textAlignVertical:'center',
                fontSize: 0.2,
                layoutOrigin: [0.5, 0.5],
                transform: [{translate: [1, 2, -3]}], }}>
                  rotx-
            </Text>
          </VrButton>

          <VrButton
            onClick={()=>yPlusClicked()}>
            <Text
              style={{
                backgroundColor:'blue',
                padding: 0.02,
                textAlign:'center',
                textAlignVertical:'center',
                fontSize: 0.2,
                layoutOrigin: [0.5, 0.5],
                transform: [{translate: [1.5, 2.5, -3]}], }}>
                  roty+
              </Text>
            </VrButton>

            <VrButton
              onClick={()=>yMinusClicked()}>
              <Text
                style={{
                  backgroundColor:'red',
                  padding: 0.02,
                  textAlign:'center',
                  textAlignVertical:'center',
                  fontSize: 0.2,
                  layoutOrigin: [0.5, 0.5],
                  transform: [{translate: [1.5, 2.5, -3]}], }}>
                    roty-
              </Text>
            </VrButton>

            <VrButton
              onClick={()=>zPlusClicked()}>
              <Text
                style={{
                  backgroundColor:'blue',
                  padding: 0.02,
                  textAlign:'center',
                  textAlignVertical:'center',
                  fontSize: 0.2,
                  layoutOrigin: [0.5, 0.5],
                  transform: [{translate: [2, 3, -3]}], }}>
                    rotz+
                </Text>
              </VrButton>

              <VrButton
                onClick={()=>zMinusClicked()}>
                <Text
                  style={{
                    backgroundColor:'red',
                    padding: 0.02,
                    textAlign:'center',
                    textAlignVertical:'center',
                    fontSize: 0.2,
                    layoutOrigin: [0.5, 0.5],
                    transform: [{translate: [2, 3, -3]}], }}>
                      rotz-
                </Text>
              </VrButton>
            </View>
          )
  }
}