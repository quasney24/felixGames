import React, { useContext, useState } from 'react';
import { View, StyleSheet } from 'react-native';

import TriviaQuestions from 'components/TriviaQuestions';
import colors from 'consts/colors';
import { AppContext } from 'context';
import { QUIZ_COMPLETED_SCREEN } from 'screens/routes';

const TriviaQ = ({ navigation }) => {
  const { triviaData } = useContext(AppContext);
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
      let correct = 0;
      let incorrect = 0;
      results.forEach((q) => {
        if (q.answeredCorrect) {
          return correct++;
        }
        incorrect++;
      });
      return navigation.navigate(QUIZ_COMPLETED_SCREEN, {
        results: {
          category: triviaData.category,
          difficulty: triviaData.difficulty,
          questions: [...results, question],
          correct,
          incorrect,
        },
      });
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
