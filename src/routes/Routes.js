import {View, Text} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SearchScreen from '../pages/SearchScreen';
import DetailedScreen from '../pages/DetailsScreen/index'
export default function Routes() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Search" component={SearchScreen} />
        <Stack.Screen name='Details' component={DetailedScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
