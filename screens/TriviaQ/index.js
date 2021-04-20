import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';

import { AppContext } from 'context';
import TriviaQuestions from 'components/TriviaQuestions';
import colors from 'consts/colors';

const TriviaQ = () => {
  const { triviaData } = useContext(AppContext);

  function shuffleArray(array) {
    let i = array.length - 1;
    for (; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }

  function dataHelper() {
    triviaData.forEach((e) => {
      console.log('data helper', e);
      e.all = e.incorrect_answers.slice();
      e.all.push(e.correct_answer);
      shuffleArray(e.all);
    });
  }
  dataHelper();

  return (
    <View style={styles.container}>
      <TriviaQuestions
        question={triviaData[0].question}
        category={triviaData[0].category}
        all={triviaData[0].all}
        correctAnswer={triviaData[0].correct_answer}
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
