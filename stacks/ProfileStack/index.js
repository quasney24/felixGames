import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import defaultOptions from 'stacks/default-options';
import { LOGIN_SCREEN } from 'screens/routes';
import Login from 'screens/Login';

const Stack = createStackNavigator();

export default function ProfileStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          ...defaultOptions,
          title: 'Login',
        }}
        name={LOGIN_SCREEN}
        component={Login}
      />
    </Stack.Navigator>
  );
}
