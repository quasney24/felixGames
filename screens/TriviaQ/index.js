import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import TriviaQuestions from 'components/TriviaQuestions';
import colors from 'consts/colors';
import { QUIZ_RESULTS_SCREEN } from 'screens/routes';
import { saveQuiz } from 'store/reducers/quizes';

const TriviaQ = ({ navigation, route }) => {
  const { triviaData } = route.params;
  const user = useSelector((state) => state.user.user);
  const [counter, setCounter] = useState(1);
  const [currentQuestion, setCurrentQuestion] = useState(
    triviaData.questions[0],
  );
  const [questionResults, setQuestionResults] = useState([]);
  const dispatch = useDispatch();

  const handleNext = (selected, result) => {
    const question = currentQuestion;
    currentQuestion.selectedAnswer = selected;
    currentQuestion.answeredCorrect = result;

    if (counter === 10) {
      let correct = 0;
      let incorrect = 0;
      questionResults.forEach((q) => {
        if (q.answeredCorrect) {
          return correct++;
        }
        incorrect++;
      });

      const quizResults = {
        category: triviaData.category,
        difficulty: triviaData.difficulty,
        questions: [...questionResults, question],
        correct,
        incorrect,
        completed: Date.now(),
      };

      if (user) {
        quizResults.uid = user.uid;
        dispatch(saveQuiz(quizResults));
      }

      return navigation.navigate(QUIZ_RESULTS_SCREEN, { quizResults });
    }

    setQuestionResults((prevState) => {
      return [...prevState, question];
    });
    setCurrentQuestion(triviaData.questions[counter]);
    setCounter(counter + 1);
  };

  return (
    <View style={styles.container}>
      <TriviaQuestions
        category={triviaData.category}
        currentQuestion={currentQuestion}
        counter={counter}
        handleNext={handleNext}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primaryColor,
  },
});

export default TriviaQ;
