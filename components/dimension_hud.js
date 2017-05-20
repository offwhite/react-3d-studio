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

export default class DimensionHud extends React.Component {
  render() {
    const {
      widthPlusClicked,
      widthMinusClicked,
      heightPlusClicked,
      heightMinusClicked,
      depthPlusClicked,
      depthMinusClicked
    } = this.props

    return (
      <View>
        <VrButton
          onClick={()=>widthPlusClicked()}>
          <Text
            style={{
              backgroundColor:'blue',
              padding: 0.02,
              textAlign:'center',
              textAlignVertical:'center',
              fontSize: 0.2,
              layoutOrigin: [0.5, 0.5],
              transform: [{translate: [1, 1, -3]}], }}>
                w+
            </Text>
          </VrButton>

          <VrButton
            onClick={()=>widthMinusClicked()}>
            <Text
              style={{
                backgroundColor:'red',
                padding: 0.02,
                textAlign:'center',
                textAlignVertical:'center',
                fontSize: 0.2,
                layoutOrigin: [0.5, 0.5],
                transform: [{translate: [1, 1, -3]}], }}>
                  w-
            </Text>
          </VrButton>

          <VrButton
            onClick={()=>heightPlusClicked()}>
            <Text
              style={{
                backgroundColor:'blue',
                padding: 0.02,
                textAlign:'center',
                textAlignVertical:'center',
                fontSize: 0.2,
                layoutOrigin: [0.5, 0.5],
                transform: [{translate: [1.5, 1.5, -3]}], }}>
                  h+
              </Text>
            </VrButton>

            <VrButton
              onClick={()=>heightMinusClicked()}>
              <Text
                style={{
                  backgroundColor:'red',
                  padding: 0.02,
                  textAlign:'center',
                  textAlignVertical:'center',
                  fontSize: 0.2,
                  layoutOrigin: [0.5, 0.5],
                  transform: [{translate: [1.5, 1.5, -3]}], }}>
                    h-
              </Text>
            </VrButton>

            <VrButton
              onClick={()=>depthPlusClicked()}>
              <Text
                style={{
                  backgroundColor:'blue',
                  padding: 0.02,
                  textAlign:'center',
                  textAlignVertical:'center',
                  fontSize: 0.2,
                  layoutOrigin: [0.5, 0.5],
                  transform: [{translate: [2, 2, -3]}], }}>
                    d+
                </Text>
              </VrButton>

              <VrButton
                onClick={()=>depthMinusClicked()}>
                <Text
                  style={{
                    backgroundColor:'red',
                    padding: 0.02,
                    textAlign:'center',
                    textAlignVertical:'center',
                    fontSize: 0.2,
                    layoutOrigin: [0.5, 0.5],
                    transform: [{translate: [2, 2, -3]}], }}>
                      d-
                </Text>
              </VrButton>
            </View>
          )
  }
}