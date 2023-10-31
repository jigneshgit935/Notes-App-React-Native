import { View, Text } from 'react-native';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Splash from './src/screens/Splash';
import Login from './src/screens/Login';
import Signup from './src/screens/Signup';
import Home from './src/screens/Home';

export type RootNavigationProps = {
  Splash: undefined;
  Login: undefined;
  Signup: undefined;
  Home: undefined;
};
const Stack = createStackNavigator<RootNavigationProps>();
const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Splash"
          component={Splash}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Login" component={Login} options={{ title: '' }} />
        <Stack.Screen
          name="Signup"
          component={Signup}
          options={{ title: '' }}
        />
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
