import colors from 'consts/colors';
import React from 'react';
import {
  ActivityIndicator,
  View,
  Text,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { Card, Divider } from 'react-native-elements';

const MyQuestionsList = ({ questions, isLoading, status }) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {isLoading && (
        <View style={styles.loadingSpinner}>
          <ActivityIndicator size="large" color={colors.primaryColor} />
        </View>
      )}
      {questions.length === 0 && (
        <View style={{ alignItems: 'center', paddingTop: 30 }}>
          <Text style={{ ...styles.text, ...styles.label }}>
            No questions {status}.
          </Text>
        </View>
      )}
      {questions.map((q) => {
        return (
          <View key={q.id}>
            <Card containerStyle={styles.cardContainer}>
              <Card.Title style={styles.headerText}>{q.question}</Card.Title>
              <Divider
                style={{ backgroundColor: colors.primaryColor, height: 1 }}
              />
              <View style={{ marginTop: 20 }}>
                <Text style={{ ...styles.text, ...styles.label }}>
                  Category
                </Text>
                <Text style={styles.text}>{q.category}</Text>
              </View>
              <View style={{ marginTop: 10 }}>
                <Text style={{ ...styles.text, ...styles.label }}>
                  Difficulty
                </Text>
                <Text style={styles.text}>{q.difficulty}</Text>
              </View>
              <View style={{ marginTop: 10 }}>
                <Text style={{ ...styles.text, ...styles.label }}>
                  Correct Answer
                </Text>
                <Text style={styles.text}>{q.correctAnswer}</Text>
              </View>
              <View style={{ marginTop: 10 }}>
                <Text style={{ ...styles.text, ...styles.label }}>
                  Inorrect Answers
                </Text>
                {q.incorrectAnswers.map((a) => (
                  <Text style={styles.text}>{a}</Text>
                ))}
              </View>
              {q.notes.length > 0 && (
                <View style={{ marginTop: 20 }}>
                  <Divider
                    style={{ backgroundColor: colors.primaryColor, height: 1 }}
                  />
                  <View style={{ marginTop: 20 }}>
                    <Text style={{ ...styles.text, ...styles.label }}>
                      Notes
                    </Text>
                    <Text style={styles.text}>{q.notes}</Text>
                  </View>
                </View>
              )}
            </Card>
          </View>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    paddingBottom: 30,
  },
  headerText: {
    fontSize: 18,
    textAlign: 'left',
  },
  cardContainer: {
    borderRadius: 15,
    borderWidth: 2,
    marginVertical: 30,
  },
  text: {
    fontSize: 16,
  },
  label: {
    fontWeight: 'bold',
  },
});

export default MyQuestionsList;
