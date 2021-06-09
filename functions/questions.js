import * as firebase from 'firebase';
import 'firebase/firestore';
import { Alert } from 'react-native';

export const saveQuestion = async ({
  category,
  difficulty,
  question,
  correctAnswer,
  incorrectAnswers,
  uid,
}) => {
  try {
    if (!category) {
      return Alert.alert('Please select a category.');
    }
    if (!difficulty) {
      return Alert.alert('Please select a difficulty.');
    }
    if (!question) {
      return Alert.alert('Please provide the question prompt.');
    }
    if (!correctAnswer) {
      return Alert.alert('Please provide the correct answer.');
    }
    incorrectAnswers.forEach((q) => {
      if (q.length === 0) {
        return Alert.alert('Please provide 3 incorrect answers.');
      }
    });

    return await firebase
      .firestore()
      .collection('questionSubmissions')
      .add({
        category,
        difficulty,
        question,
        correctAnswer,
        incorrectAnswers,
        uid,
      })
      .then(() => {
        Alert.alert(
          'Question submitted for review! You can view the status of your question under the Profile tab.',
        );
        return true;
      });
  } catch (e) {
    Alert.alert('Please provide 3 incorrect answers.');
  }
};
