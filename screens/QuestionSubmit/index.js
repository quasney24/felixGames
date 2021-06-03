import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Input, Text, Card } from 'react-native-elements';

import colors from 'consts/colors';

const QuestionSubmit = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Category</Text>
      <Input containerStyle={styles.inputContainer} value="" />
      <Text>Difficulty</Text>
      <Input containerStyle={styles.inputContainer} value="" />
      <Text>Question</Text>
      <Input containerStyle={styles.inputContainer} value="" />
      <Text>Correct Answer</Text>
      <Input containerStyle={styles.inputContainer} value="" />
      <Text>Incorrect Answers</Text>
      <Input containerStyle={styles.inputContainer} value="" />
      <Input containerStyle={styles.inputContainer} value="" />
      <Input containerStyle={styles.inputContainer} value="" />
    </View>
  );
};

const styles = StyleSheet.create({
  // header: {
  //   textAlign: 'center',
  //   fontSize: 50,
  //   color: '#009e60',
  // },
  // buttons: {
  //   display: 'flex',
  //   marginHorizontal: 50,
  //   borderWidth: 1,
  //   backgroundColor: '#009e60',
  //   height: 75,
  //   justifyContent: 'center',
  // },
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  headerText: {
    fontSize: 22,
  },
  centerText: {
    textAlign: 'center',
  },
  cardContainer: {
    borderRadius: 15,
    marginTop: 30,
  },
  cardDivider: {
    backgroundColor: colors.white,
    height: 1,
  },
  welcomeCard: {
    borderColor: colors.primaryColor,
    borderWidth: 3,
  },
});

export default QuestionSubmit;
