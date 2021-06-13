import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { Alert, BottomSheet, Button, Input, Text } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import * as firebase from 'firebase';
import 'firebase/firestore';

import Category from 'components/Category';
import QuizSettingSelction from 'components/QuizSettingSelction';
import colors from 'consts/colors';
import errorMessages from 'consts/errorMessages';
import { fetchQuizCategories } from 'store/reducers/quizCategories';
import { PROFILE_SCREEN } from 'screens/routes';
import {
  approveQuestion,
  denyQuestion,
  saveQuestion,
} from 'functions/questions';
import Modal from 'components/Modal';

const QuestionSubmit = ({ navigation, route }) => {
  const { isReview, submission } = route.params;
  const [questionSubmission, setQuestionSubmission] = useState(submission);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [question, setQuestion] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [incorrectAnswer1, setIncorrectAnswer1] = useState('');
  const [incorrectAnswer2, setIncorrectAnswer2] = useState('');
  const [incorrectAnswer3, setIncorrectAnswer3] = useState('');
  const [notes, setNotes] = useState('');
  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalText, setModalText] = useState('');
  const [modalButtons, setModalButtons] = useState({
    button1: {},
    button2: {},
  });
  const user = useSelector((state) => state.user.user);
  const categories = useSelector((state) => state.quizCategories.categories);
  const dispatch = useDispatch();

  useEffect(() => {
    if (categories.length === 0) {
      dispatch(fetchQuizCategories());
    }
    if (isReview) {
      setCategory(questionSubmission.category);
      setDifficulty(questionSubmission.difficulty);
      setQuestion(questionSubmission.question);
      setCorrectAnswer(questionSubmission.correctAnswer);
      setIncorrectAnswer1(questionSubmission.incorrectAnswers[0]);
      setIncorrectAnswer2(questionSubmission.incorrectAnswers[1]);
      setIncorrectAnswer3(questionSubmission.incorrectAnswers[2]);
    }
  }, [questionSubmission]);

  const handleQuestionSubmit = async () => {
    try {
      setLoading(true);
      const incorrectAnswers = [
        incorrectAnswer1,
        incorrectAnswer2,
        incorrectAnswer3,
      ];
      const isValid = validateForm(incorrectAnswers);
      if (isValid) {
        await saveQuestion({
          category,
          difficulty,
          question,
          correctAnswer,
          incorrectAnswers,
          user,
        });
        navigation.goBack();
      }
    } catch (e) {
      Alert.alert(errorMessages.questionSubmit);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async () => {
    try {
      setLoading(true);
      const incorrectAnswers = [
        incorrectAnswer1,
        incorrectAnswer2,
        incorrectAnswer3,
      ];
      const isValid = validateForm(incorrectAnswers);
      if (isValid) {
        await approveQuestion({
          id: submission.id,
          category,
          difficulty,
          question,
          correctAnswer,
          incorrectAnswers,
          uid: submission.uid,
          userDisplayName: submission.userDisplayName,
          notes,
        });
        setModalButtonsOnAction('approved');
      }
    } catch (e) {
      Alert.alert(errorMessages.questionApprove);
    } finally {
      setLoading(false);
    }
  };

  const handleDeny = async () => {
    try {
      setLoading(true);
      await denyQuestion(submission.id);
      setModalButtonsOnAction('denied');
    } catch (e) {
      Alert.alert(errorMessages.questionDeny);
    } finally {
      setLoading(false);
    }
  };

  const validateForm = (incorrectAnswers) => {
    let isValid = true;
    if (!category) {
      isValid = false;
      Alert.alert('Please select a category.');
    }
    if (!difficulty) {
      isValid = false;
      Alert.alert('Please select a difficulty.');
    }
    if (!question) {
      isValid = false;
      Alert.alert('Please provide the question prompt.');
    }
    if (!correctAnswer) {
      isValid = false;
      Alert.alert('Please provide the correct answer.');
    }
    incorrectAnswers.forEach((q) => {
      if (q.length === 0 || q === undefined) {
        console.log(q);
        isValid = false;
        Alert.alert('Please provide 3 incorrect answers.');
      }
    });
    return isValid;
  };

  const setModalButtonsOnAction = (action) => {
    setShowModal(true);
    setModalText(
      'Question successfully ' +
        action +
        "! Press 'Next' to review another question, or 'Go Back' to stop.",
    );
    setModalButtons({
      button1: {
        title: 'Go Back',
        style: { backgroundColor: colors.incorrect },
        action: () => navigation.popToTop(),
      },
      button2: {
        title: 'Next',
        style: { backgroundColor: colors.primaryColor },
        action: async () => {
          try {
            setLoading(true);
            await firebase
              .firestore()
              .collection('questionSubmissions')
              .where('status', '==', 'Review')
              .limit(1)
              .get()
              .then((querySnapshot) => {
                if (querySnapshot.empty) {
                  setModalText(
                    'Sorry, no more questions available for review.',
                  );
                  setModalButtons({
                    button1: {
                      title: 'Go Back',
                      style: { backgroundColor: colors.incorrect },
                      action: () => navigation.popToTop(),
                    },
                  });
                }
                querySnapshot.forEach(async (documentSnapshot) => {
                  if (documentSnapshot.exists) {
                    setShowModal(false);
                    setQuestionSubmission({
                      ...documentSnapshot.data(),
                      id: documentSnapshot.id,
                    });
                  }
                });
              });
          } catch {
          } finally {
            setLoading(false);
          }
        },
      },
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.form}>
        <Text style={styles.inputTitle}>Category</Text>
        <View style={{ marginVertical: 15 }}>
          {category.length !== 0 && (
            <TouchableOpacity
              style={styles.wrapper}
              onPress={() => setShowBottomSheet(true)}>
              <Text style={styles.text}>{category}</Text>
            </TouchableOpacity>
          )}
          {category.length === 0 && (
            <Button
              buttonStyle={styles.wrapper}
              title="Select"
              onPress={() => setShowBottomSheet(true)}
            />
          )}
        </View>
        <Text style={styles.inputTitle}>Difficulty</Text>
        <QuizSettingSelction
          values={['easy', 'medium', 'hard']}
          selectedValue={difficulty}
          setSelectedValue={(value) => {
            setDifficulty(value);
          }}
        />
        <Text style={styles.inputTitle}>Question</Text>
        <Input multiline value={question} onChangeText={setQuestion} />
        <Text style={styles.inputTitle}>Correct Answer</Text>
        <Input value={correctAnswer} onChangeText={setCorrectAnswer} />
        <Text style={styles.inputTitle}>Incorrect Answers</Text>
        <Input value={incorrectAnswer1} onChangeText={setIncorrectAnswer1} />
        <Input value={incorrectAnswer2} onChangeText={setIncorrectAnswer2} />
        <Input value={incorrectAnswer3} onChangeText={setIncorrectAnswer3} />
        {isReview && (
          <>
            <Text style={styles.inputTitle}>Notes</Text>
            <Input multiline value={notes} onChangeText={setNotes} />
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.inputTitle}>Submitted by: </Text>
              <TouchableOpacity
                onPress={() =>
                  navigation.push(PROFILE_SCREEN, {
                    displayName: submission.userDisplayName,
                    userId: submission.uid,
                  })
                }>
                <Text style={{ ...styles.inputTitle, color: 'blue' }}>
                  {submission.userDisplayName}
                </Text>
              </TouchableOpacity>
            </View>
          </>
        )}
        {!loading && !isReview && (
          <View style={styles.buttonContainer}>
            <View style={{ width: '50%' }}>
              <Button
                buttonStyle={{ ...styles.button, ...styles.submitButton }}
                textAlign="center"
                title="Submit"
                onPress={handleQuestionSubmit}
              />
            </View>
          </View>
        )}
        {!loading && isReview && (
          <View style={styles.buttonContainer}>
            <View style={{ width: '50%' }}>
              <Button
                buttonStyle={{
                  ...styles.button,
                  ...styles.rejectButton,
                }}
                textAlign="center"
                title="Deny"
                onPress={handleDeny}
              />
            </View>
            <View style={{ width: '50%' }}>
              <Button
                buttonStyle={{
                  ...styles.button,
                  ...styles.submitButton,
                }}
                textAlign="center"
                title="Approve"
                onPress={handleApprove}
              />
            </View>
          </View>
        )}
        {loading && (
          <View style={styles.loadingSpinner}>
            <ActivityIndicator size="large" color={colors.primaryColor} />
          </View>
        )}
      </View>
      <BottomSheet
        modalProps={{ visible: showBottomSheet }}
        containerStyle={styles.bottomSheetContainer}>
        <View style={styles.bottomSheetContentContainer}>
          <Text style={styles.title}>Select a Category</Text>
          <Category
            data={categories}
            getId={(id) => {
              setCategory(categories.filter((cat) => cat.id === id)[0].name);
              setShowBottomSheet(false);
            }}
          />
        </View>
      </BottomSheet>
      <Modal
        width="80%"
        height="50%"
        visible={showModal}
        modalText={modalText}
        button={modalButtons.button1}
        button2={modalButtons.button2}
        loading={loading}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
  },
  form: {
    width: '90%',
    paddingVertical: '3%',
    marginTop: '5%',
    alignSelf: 'center',
    height: '100%',
  },
  wrapper: {
    borderRadius: 50,
    borderColor: colors.primaryColor,
    borderWidth: 2,
    padding: 10,
    paddingHorizontal: 20,
    backgroundColor: colors.primaryColor,
    marginHorizontal: 7,
    marginVertical: 7,
  },
  text: {
    fontSize: 18,
    color: colors.white,
    textAlign: 'center',
  },
  inputTitle: {
    fontSize: 18,
  },
  bottomSheetContainer: {
    backgroundColor: colors.white,
  },
  bottomSheetContentContainer: {
    marginHorizontal: 20,
    alignContent: 'center',
    marginVertical: '3%',
  },
  title: {
    color: colors.primaryColor,
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginBottom: 40,
    marginTop: 20,
    justifyContent: 'space-evenly',
  },
  button: {
    borderWidth: 2,
    borderRadius: 20,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  submitButton: {
    backgroundColor: colors.primaryColor,
    borderColor: colors.primaryColor,
    width: '80%',
  },
  rejectButton: {
    backgroundColor: colors.incorrect,
    borderColor: colors.incorrect,
    width: '80%',
  },
});

export default QuestionSubmit;
