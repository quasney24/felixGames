import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card } from 'react-native-elements';
import colors from 'consts/colors';

const QuestionCard = ({ question }) => {
  console.log(question.selectedAnswer);
  return (
    <View style={styles.container}>
      <Card containerStyle={styles.cardContainer}>
        <Card.Title style={styles.headerText}>{question.question}</Card.Title>
        {question.selectedAnswer === '' && (
          <View style={styles.noAnswerSelectedContainer}>
            <Text style={{ ...styles.choiceText, ...styles.incorrectAnswer }}>
              No answer selected.
            </Text>
          </View>
        )}
        {question.all.map((choice) => {
          if (question.correctAnswer === choice) {
            return (
              <View style={styles.choiceTextContainer}>
                <Text style={{ ...styles.choiceText, ...styles.correctAnswer }}>
                  {choice}
                </Text>
              </View>
            );
          }
          if (question.selectedAnswer === choice && !question.answeredCorrect) {
            return (
              <View style={styles.choiceTextContainer}>
                <Text
                  style={{ ...styles.choiceText, ...styles.incorrectAnswer }}>
                  {choice}
                </Text>
              </View>
            );
          }
          return (
            <View style={styles.choiceTextContainer}>
              <Text style={styles.choiceText}>{choice}</Text>
            </View>
          );
        })}
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  headerText: {
    fontSize: 18,
    textAlign: 'left',
  },
  cardContainer: {
    borderRadius: 15,
    borderWidth: 2,
    marginTop: 0,
  },
  noAnswerSelectedContainer: {
    marginBottom: 10,
  },
  choiceTextContainer: {
    marginVertical: 5,
  },
  choiceText: {
    color: colors.black,
    fontSize: 16,
  },
  correctAnswer: {
    color: colors.primaryColor,
    fontWeight: 'bold',
  },
  incorrectAnswer: {
    color: colors.incorrect,
    fontWeight: 'bold',
  },
});

export default QuestionCard;
