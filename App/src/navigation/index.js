import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {IntroScreen, SetupScreen, SteeringScreen} from './screens';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="intro" component={IntroScreen} />
        <Stack.Screen name="setup" component={SetupScreen} />
        <Stack.Screen name="steer" component={SteeringScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
