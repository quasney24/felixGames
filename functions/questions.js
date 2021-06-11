import * as firebase from 'firebase';
import 'firebase/firestore';
import { Alert } from 'react-native';

export const saveQuestion = async ({
  category,
  difficulty,
  question,
  correctAnswer,
  incorrectAnswers,
  user,
}) => {
  return await firebase
    .firestore()
    .collection('questionSubmissions')
    .add({
      category,
      difficulty,
      question,
      correctAnswer,
      incorrectAnswers,
      uid: user.uid,
      userDisplayName: user.displayName,
      status: 'Review',
      createdDate: Date.now(),
      notes: '',
      approver: '',
    })
    .then(() => {
      Alert.alert(
        'Question submitted for review! You can view the status of your question under the Profile tab.',
      );
    });
};

export const getMyQuestions = async (uid) => {
  return await firebase
    .firestore()
    .collection('questionSubmissions')
    .where('uid', '==', uid)
    .get()
    .then((querySnapshot) => {
      const questions = [];
      querySnapshot.forEach(async (documentSnapshot) => {
        const q = documentSnapshot.data();
        questions.push({ id: documentSnapshot.id, ...q });
      });
      return questions;
    });
};

export const approveQuestion = async (question) => {
  await firebase
    .firestore()
    .collection('questionSubmissions')
    .doc(question.id)
    .update({
      status: 'Approved',
      notes: question.notes,
    });

  return await firebase.firestore().collection('questions').add({
    category: question.category,
    difficulty: question.difficulty,
    question: question.question,
    correctAnswer: question.correctAnswer,
    incorrectAnswers: question.incorrectAnswers,
    submittedBy: question.uid,
    submittedByDisplayName: question.userDisplayName,
    createdDate: Date.now(),
  });
};

export const denyQuestion = async (id) => {
  await firebase.firestore().collection('questionSubmissions').doc(id).update({
    status: 'Declined',
  });
};
