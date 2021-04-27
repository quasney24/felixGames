import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import QuestionCard from 'components/QuestionCard';
import colors from 'consts/colors';

//TODO complete this screen when we have a data store
const QuizResults = ({ navigation, route }) => {
  const { quizResults } = route.params;

  return (
    <ScrollView style={{ backgroundColor: colors.white }}>
      <View style={styles.summaryContainer}>
        <Text
          style={
            quizResults.correct <= 5
              ? { ...styles.resultText, ...styles.failText }
              : quizResults.correct <= 7
              ? { ...styles.resultText, ...styles.averageText }
              : { ...styles.resultText, ...styles.passText }
          }>
          {quizResults.correct} / {quizResults.questions.length}
        </Text>
        <Text style={styles.categoryText}>
          {quizResults.category} &bull; {quizResults.difficulty}
        </Text>
      </View>
      {quizResults.questions.map((q) => {
        console.log(q);
        return <QuestionCard key={q.question} question={q} />;
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  summaryContainer: {
    textAlign: 'center',
    alignItems: 'center',
    padding: 20,
  },
  resultText: {
    fontSize: 38,
    fontWeight: 'bold',
  },
  failText: {
    color: colors.incorrect,
  },
  averageText: {
    color: '#FFE302',
  },
  passText: {
    color: colors.primaryColor,
  },
  categoryText: {
    fontSize: 28,
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
});

export default QuizResults;
