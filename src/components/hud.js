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

export default class Hud extends React.Component {
  render() {
    const {
      xPlusClicked,
      xMinusClicked,
      yPlusClicked,
      yMinusClicked,
      zPlusClicked,
      zMinusClicked,
      addBox,
      removeBox
    } = this.props

    return (
      <View>
        <VrButton
          onClick={()=>addBox()}>
          <Text
            style={{
              backgroundColor:'blue',
              padding: 0.02,
              textAlign:'center',
              textAlignVertical:'center',
              fontSize: 0.2,
              layoutOrigin: [0.5, 0.5],
              transform: [{translate: [1, 0.2, -3]}], }}>
                AddBox
            </Text>
          </VrButton>

          <VrButton
            onClick={()=>removeBox()}>
            <Text
              style={{
                backgroundColor:'red',
                padding: 0.02,
                textAlign:'center',
                textAlignVertical:'center',
                fontSize: 0.2,
                layoutOrigin: [0.5, 0.5],
                transform: [{translate: [1, 0.2, -3]}], }}>
                  RemoveBox
              </Text>
            </VrButton>
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
              transform: [{translate: [1, 0, -3]}], }}>
                x+
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
                transform: [{translate: [1, -0.1, -3]}], }}>
                  x-
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
                transform: [{translate: [1.5, 0.6, -3]}], }}>
                  y+
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
                  transform: [{translate: [1.5, 0.5, -3]}], }}>
                    y-
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
                  transform: [{translate: [2, 1.3, -3]}], }}>
                    z+
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
                    transform: [{translate: [2, 1.1, -3]}], }}>
                      z-
                </Text>
              </VrButton>
            </View>
          )
  }
}
