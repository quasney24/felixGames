import React, { useState, useContext } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import base64 from 'react-native-base64';
import { Text } from 'react-native-elements';
import EvilIcon from 'react-native-vector-icons/EvilIcons';

import { AppContext } from 'context';
import Modal from '../Modal';
import colors from 'consts/colors';

const TriviaQuestions = ({ data }) => {
  const { getTriviaData, id, difficulty } = useContext(AppContext);

  const [counter, setCounter] = useState(1);
  const [selected, setSelected] = useState('');
  const [clicked, setClicked] = useState(false);
  const [correct, setCorrect] = useState();

  const handleClick = (d, i) => {
    setCorrect();
    setSelected(d);
    setClicked(true);
  };

  const nextQuestion = () => {
    setClicked(false);
    setSelected('');
    getTriviaData(id, difficulty);
    setCounter(counter + 1);
  };
  const handleCorrectResult = () => {
    return (
      <View>
        <EvilIcon size="20" name="check" color={colors.primaryColor} />
      </View>
    );
  };
  const handleIncorrectResult = () => {
    return (
      <>
        <EvilIcon size="20" name="close-o" color={colors.incorrect} />
      </>
    );
  };

  return (
    <View style={styles.base}>
      {data.map((e, index) => {
        return (
          <View style={styles.container} key={e.question}>
            <View>
              <Text style={styles.headerText} h3>
                {base64.decode(e.category)}
              </Text>
              <Text h3 style={styles.headerText}>
                {counter} out of 10
              </Text>
            </View>
            <View>
              <Text style={styles.headerText} h4>
                {base64.decode(e.question)}
              </Text>
            </View>
            {e.all.map((d, i) => {
              return (
                <TouchableOpacity
                  key={d}
                  style={styles.contentWrapper}
                  onPress={() => {
                    handleClick(d, i);
                    setCorrect(e.correct_answer);
                  }}>
                  <View style={styles.icon}>
                    {clicked && d === e.correct_answer
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
          </View>
        );
      })}

      {clicked ? (
        <Modal
          buttonText={'Next'}
          text={selected === correct ? 'NICE!' : 'WHOOPS!'}
          next={nextQuestion}
        />
      ) : null}
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
    flex: 0,
  },
  textBox: {
    flex: 10,
  },
});
export default TriviaQuestions;
