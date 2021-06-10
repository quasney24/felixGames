import {
  FRIENDS_SCREEN,
  MY_QUESTIONS_SCREEN,
  QUESTION_SUBMIT,
  QUIZ_RESULTS_LIST_SCREEN,
  TRIVIA_SCREEN,
} from 'screens/routes';

export const homeMenuOptions = [
  {
    title: 'Accuracy',
    subtitle: 'Get them all Right!',
    navigation: TRIVIA_SCREEN,
  },
  {
    title: 'Speed',
    subtitle: 'Better go fast!',
    navigation: TRIVIA_SCREEN,
  },
  {
    title: 'Submit a Question',
    subtitle: 'Contribute your knowledge!',
    navigation: QUESTION_SUBMIT,
  },
];

export const profileMenuOptions = [
  {
    title: 'Quizzes',
    navigation: QUIZ_RESULTS_LIST_SCREEN,
  },
  {
    title: 'Friends',
    navigation: FRIENDS_SCREEN,
  },
  {
    title: 'My Questions',
    navigation: MY_QUESTIONS_SCREEN,
  },
];
