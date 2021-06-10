import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';

import defaultOptions from 'stacks/default-options';
import {
  FRIENDS_SCREEN,
  LOGIN_SCREEN,
  MY_QUESTIONS_SCREEN,
  PROFILE_SCREEN,
  QUIZ_RESULTS_SCREEN,
  QUIZ_RESULTS_LIST_SCREEN,
  USER_SEARCH_SCREEN,
} from 'screens/routes';
import Friends from 'screens/Friends';
import Login from 'screens/Login';
import MyQuestions from 'screens/MyQuestions';
import Profile from 'screens/Profile';
import QuizResults from 'screens/QuizResults';
import QuizResultsList from 'screens/QuizResultsList';
import UserSearch from 'screens/UserSearch';

const Stack = createStackNavigator();

export default function ProfileStack() {
  const user = useSelector((state) => state.user.user);
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
        name={QUIZ_RESULTS_LIST_SCREEN}
        component={QuizResultsList}
        options={{
          ...defaultOptions,
          title: 'Quizzes',
        }}
      />
      <Stack.Screen
        name={QUIZ_RESULTS_SCREEN}
        component={QuizResults}
        options={{
          ...defaultOptions,
          title: 'Quiz Results',
        }}
      />
      <Stack.Screen
        name={FRIENDS_SCREEN}
        component={Friends}
        options={{
          ...defaultOptions,
          title: 'Friends',
        }}
      />
      <Stack.Screen
        name={USER_SEARCH_SCREEN}
        component={UserSearch}
        options={{
          ...defaultOptions,
          title: 'Find User',
        }}
      />
      <Stack.Screen
        name={MY_QUESTIONS_SCREEN}
        component={MyQuestions}
        options={{
          ...defaultOptions,
          title: 'My Questions',
        }}
      />
    </Stack.Navigator>
  );
}
