import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { AppContext } from 'context';
import defaultOptions from 'stacks/default-options';
import {
  LOGIN_SCREEN,
  PROFILE_SCREEN,
  QUIZ_RESULTS_SCREEN,
} from 'screens/routes';
import Login from 'screens/Login';
import Profile from 'screens/Profile';
import QuizResults from 'screens/QuizResults';

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
          name={LOGIN_SCREEN}
          component={Login}
          options={{
            ...defaultOptions,
            title: 'Login',
          }}
        />
      )}
      <Stack.Screen
        name={QUIZ_RESULTS_SCREEN}
        component={QuizResults}
        options={{
          ...defaultOptions,
          title: 'Quiz Results',
        }}
      />
    </Stack.Navigator>
  );
}
