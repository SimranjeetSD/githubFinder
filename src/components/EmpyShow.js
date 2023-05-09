import { View, Text } from 'react-native'
import React from 'react'
import Lottie from 'lottie-react-native';
export default function EmpyShow() {
  return (
    <View style={{flex: 1, display: 'flex', justifyContent:'center', alignItems:'center', }}>
      <Lottie source={require('../../assets/githubCat.json')} autoPlay loop />
    </View>
  )
}