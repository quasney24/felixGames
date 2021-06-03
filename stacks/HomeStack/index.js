import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import defaultOptions from 'stacks/default-options';
import Home from 'screens/Home';
import Trivia from 'screens/Trivia';
import TriviaQ from 'screens/TriviaQ';
import QuestionSubmit from 'screens/QuestionSubmit';
import QuizResults from 'screens/QuizResults';
import {
  HOME_SCREEN,
  TRIVIA_SCREEN,
  TRIVIAQ_SCREEN,
  QUIZ_RESULTS_SCREEN,
  QUESTION_SUBMIT,
} from 'screens/routes';

const Stack = createStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          ...defaultOptions,
          title: 'Felix Games',
        }}
        name={HOME_SCREEN}
        component={Home}
      />
      <Stack.Screen
        options={{
          ...defaultOptions,
          title: 'Trivia',
        }}
        name={TRIVIA_SCREEN}
        component={Trivia}
      />
      <Stack.Screen
        name={TRIVIAQ_SCREEN}
        component={TriviaQ}
        options={{
          ...defaultOptions,
          title: 'TriviaQ',
        }}
      />
      <Stack.Screen
        name={QUESTION_SUBMIT}
        component={QuestionSubmit}
        options={{
          ...defaultOptions,
          title: 'Submit a Question',
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
    </Stack.Navigator>
  );
}
