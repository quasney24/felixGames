import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import base64 from 'react-native-base64';
import { Button, Text } from 'react-native-elements';
import EvilIcon from 'react-native-vector-icons/EvilIcons';

import colors from 'consts/colors';

const TriviaQuestions = ({ currentQuestion, counter, handleNext }) => {
  const [selected, setSelected] = useState('');
  const [clicked, setClicked] = useState(false);

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
          <View>
            <Text style={styles.headerText} h3>
              {base64.decode(currentQuestion.category)}
            </Text>
            <Text h3 style={styles.headerText}>
              {counter} out of 10
            </Text>
          </View>
          <View>
            <Text style={styles.headerText} h4>
              {base64.decode(currentQuestion.question)}
            </Text>
          </View>
          {currentQuestion.all.map((d, i) => {
            return (
              <TouchableOpacity
                key={d}
                style={styles.contentWrapper}
                onPress={() => {
                  setSelected(d);
                  setClicked(true);
                }}>
                <View style={styles.icon}>
                  {clicked && d === currentQuestion.correct_answer
                    ? handleCorrectResult(d, i)
                    : clicked && d === selected
                    ? handleIncorrectResult(d, i)
                    : null}
                </View>
                <View style={styles.textBox}>
                  <Text style={styles.text}>{base64.decode(d)}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
          <View style={styles.buttonContainer}>
            <Button
              disabled={!clicked}
              title="Next"
              onPress={() => {
                handleNext(selected);
                setClicked(false);
              }}
            />
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  base: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  contentWrapper: {
    textAlign: 'center',
    flexDirection: 'row',
    borderColor: 'white',
    borderWidth: 1,
    padding: 20,
    width: '90%',
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  text: {
    color: colors.primaryColor,
    textAlign: 'center',
  },
  headerText: {
    color: 'white',
    textAlign: 'center',
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
    width: '60%',
    marginVertical: 5,
    alignSelf: 'center',
  },
});
export default TriviaQuestions;
