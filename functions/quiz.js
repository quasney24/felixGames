import * as firebase from 'firebase';
import 'firebase/firestore';
import base64 from 'react-native-base64';
import { shuffleArray } from './util';

export const transformAPIData = (data) => {
  const transformedData = { questions: [] };
  transformedData.category = base64
    .decode(data[0].category)
    .replace('Entertainment: ', '')
    .replace('Science: ', '');

  transformedData.difficulty = base64.decode(data[0].difficulty);

  data.forEach((e) => {
    const incorrectAnswers = [];
    e.incorrect_answers.forEach((i) => {
      incorrectAnswers.push(base64.decode(i));
    });
    e.incorrectAnswers = incorrectAnswers;
    e.correctAnswer = base64.decode(e.correct_answer);
    e.question = base64.decode(e.question);
    e.type = base64.decode(e.type);

    delete e.incorrect_answers;
    delete e.correct_answer;
    delete e.category;
    delete e.difficulty;

    e.all = e.incorrectAnswers.slice();
    e.all.push(e.correctAnswer);
    shuffleArray(e.all);
    transformedData.questions.push(e);
  });
  return transformedData;
};

export const saveQuizResults = async (results) => {
  let correct = 0;
  let incorrect = 0;
  results.questions.forEach((q) => {
    if (q.answeredCorrect) {
      return correct++;
    }
    incorrect++;
  });
  results.correct = correct;
  results.incorrect = incorrect;

  firebase
    .firestore()
    .collection('quizResults')
    .add(results)
    .then(() => {})
    .catch((e) => {
      console.log(e);
    });
};
