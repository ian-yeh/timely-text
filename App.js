import React, {useState} from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';

import {
  Modal,
  StyleSheet,
} from 'react-native';

import Home from './pages/Home';
import Editor from './pages/Editor';


const Stack = createNativeStackNavigator();

const animationConfig = {
  animation: 'spring',
  config: {
    stiffness: 1000,
    damping: 50,
    mass: 3,
    overShootClamping: false,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  }
}

export default function App() {
  return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName='Home'
          screenOptions={{
            headerShown: false,
            gestureEnabled: true,
            presentation: Modal,
          }}
        >
          <Stack.Screen
            name="Home"
            component={Home}
          />
          <Stack.Screen
            name="Editor"
            component={Editor}
          />
        </Stack.Navigator>
      </NavigationContainer>
  )
}

const styles = StyleSheet.create({


})
