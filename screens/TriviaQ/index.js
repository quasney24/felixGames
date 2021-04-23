import React, { useContext, useState } from 'react';
import { View, StyleSheet } from 'react-native';

import { AppContext } from 'context';
import TriviaQuestions from 'components/TriviaQuestions';
import colors from 'consts/colors';
import { HOME_SCREEN } from 'screens/routes';

const TriviaQ = ({ navigation }) => {
  const { triviaData } = useContext(AppContext);
  const [counter, setCounter] = useState(1);
  const [currentQuestion, setCurrentQuestion] = useState(triviaData[0]);
  const [results, setResults] = useState([]);

  const handleNext = (selected) => {
    const question = currentQuestion;
    currentQuestion.selected = selected;
    setResults((prevState) => {
      return {
        ...prevState,
        question,
      };
    });
    if (counter === 10) {
      return navigation.navigate(HOME_SCREEN);
    }
    setCurrentQuestion(triviaData[counter]);
    setCounter(counter + 1);
  };

  return (
    <View style={styles.container}>
      <TriviaQuestions
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
