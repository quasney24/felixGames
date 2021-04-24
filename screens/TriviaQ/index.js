import React, { useContext, useState } from 'react';
import { View, StyleSheet } from 'react-native';

import TriviaQuestions from 'components/TriviaQuestions';
import colors from 'consts/colors';
import { AppContext } from 'context';
import { HOME_SCREEN } from 'screens/routes';
import { saveQuizResults } from 'functions/quiz';

const TriviaQ = ({ navigation }) => {
  const { triviaData, user } = useContext(AppContext);
  const [counter, setCounter] = useState(1);
  const [currentQuestion, setCurrentQuestion] = useState(
    triviaData.questions[0],
  );
  const [results, setResults] = useState([]);

  const handleNext = (selected, result) => {
    const question = currentQuestion;
    currentQuestion.selectedAnswer = selected;
    currentQuestion.answeredCorrect = result;

    if (counter === 10) {
      if (user) {
        saveQuizResults(
          {
            category: triviaData.category,
            difficulty: triviaData.difficulty,
            questions: [...results, question],
          },
          user,
        );
      }
      return navigation.navigate(HOME_SCREEN);
    }

    setResults((prevState) => {
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
