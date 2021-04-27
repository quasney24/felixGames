import * as firebase from 'firebase';
import 'firebase/firestore';
import base64 from 'react-native-base64';
import { shuffleArray } from './util';

export const transformAPIData = (data) => {
  const transformedData = { questions: [] };

  // put category and difficulty into own properties
  transformedData.category = base64
    .decode(data[0].category)
    .replace('Entertainment: ', '')
    .replace('Science: ', '');
  transformedData.difficulty = base64.decode(data[0].difficulty);

  data.forEach((q) => {
    //decode data, rename properties for consistencty
    q.question = base64.decode(q.question);
    q.type = base64.decode(q.type);
    const incorrectAnswers = [];
    q.incorrect_answers.forEach((i) => {
      incorrectAnswers.push(base64.decode(i));
    });
    q.incorrectAnswers = incorrectAnswers;
    q.correctAnswer = base64.decode(q.correct_answer);
    delete q.incorrect_answers;
    delete q.correct_answer;

    // delete category and difficulty properties (stored on top level)
    delete q.category;
    delete q.difficulty;

    // create array of answers, shuffle otherwise last answer is always correct
    q.all = q.incorrectAnswers.slice();
    q.all.push(q.correctAnswer);
    shuffleArray(q.all);
    transformedData.questions.push(q);
  });
  return transformedData;
};

export const saveQuizResults = async (results) => {
  firebase
    .firestore()
    .collection('quizResults')
    .add(results)
    .then(() => {})
    .catch((e) => {
      console.log(e);
    });
};
