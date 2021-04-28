import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import defaultOptions from 'stacks/default-options';
import { LOGIN_SCREEN, PROFILE_SCREEN } from 'screens/routes';
import Login from 'screens/Login';
import Profile from 'screens/Profile';
import { AppContext } from 'context';

const Stack = createStackNavigator();

export default function ProfileStack() {
  const { user } = useContext(AppContext);
  return (
    <Stack.Navigator>
      {user !== null ? (
        <Stack.Screen
          name={PROFILE_SCREEN}
          component={Profile}
          initialParams={{
            displayName: user.displayName,
            userId: user.uid,
          }}
          options={{
            ...defaultOptions,
            title: 'Profile',
          }}
        />
      ) : (
        <Stack.Screen
          options={{
            ...defaultOptions,
            title: 'Login',
          }}
          name={LOGIN_SCREEN}
          component={Login}
        />
      )}
    </Stack.Navigator>
  );
}
