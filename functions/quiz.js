import * as firebase from 'firebase';
import 'firebase/firestore';

import { shuffleArray } from './util';

export const getTriviaData = async (category, difficulty) => {
  let triviaData = { questions: [], category, difficulty };
  await firebase
    .firestore()
    .collection('questions')
    .where('category', '==', category)
    .where('difficulty', '==', difficulty)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((documentSnapshot) => {
        documentSnapshot.all;
        const q = documentSnapshot.data();
        q.all = [q.correctAnswer, ...q.incorrectAnswers];
        shuffleArray(q.all);
        triviaData.questions.push({ id: documentSnapshot.id, ...q });
      });
    });
  return triviaData;
};
