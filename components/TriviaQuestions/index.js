import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-elements';
import EvilIcon from 'react-native-vector-icons/EvilIcons';

import colors from 'consts/colors';

const TriviaQuestions = ({
  category,
  currentQuestion,
  counter,
  handleNext,
}) => {
  const [selected, setSelected] = useState('');
  const [clicked, setClicked] = useState(false);
  const [correct, setCorrect] = useState(false);

  const handleCorrectResult = () => {
    return (
      <View>
        <EvilIcon size={20} name="check" color={colors.primaryColor} />
      </View>
    );
  };

  const handleIncorrectResult = () => {
    return (
      <>
        <EvilIcon size={20} name="close-o" color={colors.incorrect} />
      </>
    );
  };

  return (
    <View style={styles.base}>
      {currentQuestion && (
        <View style={styles.container} key={currentQuestion.question}>
          <View style={styles.headerContainer}>
            <Text style={{ ...styles.text, ...styles.headerText }}>
              {category}
            </Text>
            <Text style={{ ...styles.text, ...styles.headerText }}>
              {counter} out of 10
            </Text>
          </View>
          <View>
            <Text style={{ ...styles.text, ...styles.questionText }}>
              {currentQuestion.question}
            </Text>
          </View>
          {currentQuestion.all.map((d, i) => {
            return (
              <TouchableOpacity
                key={d}
                style={styles.contentWrapper}
                disabled={clicked}
                onPress={() => {
                  setClicked(true);
                  setSelected(d);
                  setCorrect(
                    d === currentQuestion.correctAnswer ? true : false,
                  );
                }}>
                <View style={styles.icon}>
                  {clicked && d === currentQuestion.correctAnswer
                    ? handleCorrectResult(d, i)
                    : clicked && d === selected
                    ? handleIncorrectResult(d, i)
                    : null}
                </View>
                <View style={styles.textBox}>
                  <Text style={{ ...styles.text, ...styles.buttonText }}>
                    {d}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
          <TouchableOpacity
            style={
              !clicked
                ? { ...styles.contentWrapper, ...styles.disabledButton }
                : { ...styles.contentWrapper, ...styles.nextButton }
            }
            disabled={!clicked}
            onPress={() => {
              handleNext(selected, correct);
              setClicked(false);
            }}>
            <View style={styles.textBox}>
              <Text
                style={
                  !clicked
                    ? { ...styles.text, ...styles.disabledText }
                    : styles.text
                }>
                Next
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  base: {
    flex: 1,
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    width: '90%',
  },
  contentWrapper: {
    textAlign: 'center',
    flexDirection: 'row',
    borderColor: 'white',
    borderWidth: 1,
    padding: 20,
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  nextButton: {
    width: '50%',
    alignSelf: 'center',
    backgroundColor: colors.accentColor,
    borderWidth: 0,
  },
  disabledButton: {
    width: '50%',
    alignSelf: 'center',
    backgroundColor: colors.gray,
    borderWidth: 0,
  },
  disabledText: {
    color: colors.white,
  },
  text: {
    color: colors.white,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  headerText: {
    fontSize: 26,
  },
  questionText: {
    fontSize: 22,
  },
  icon: {
    top: '100%',
    left: 20,
    position: 'absolute',
  },
  textBox: {
    flex: 10,
  },
  buttonContainer: {
    width: '50%',
    alignSelf: 'center',
  },
  buttonText: {
    color: colors.primaryColor,
    textAlign: 'center',
  },
});
export default TriviaQuestions;
