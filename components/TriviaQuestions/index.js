import React, { useState, useContext } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import base64 from 'react-native-base64';
import { Text } from 'react-native-elements';
import EvilIcon from 'react-native-vector-icons/EvilIcons';

import { AppContext } from 'context';
import Modal from '../Modal';
import colors from 'consts/colors';

const TriviaQuestions = ({ question, category, all, correctAnswer }) => {
  //@TODO Need to refactor this logic so this only scrambles once

  const { getTriviaData, id, difficulty } = useContext(AppContext);
  console.log(id, difficulty);

  const [counter, setCounter] = useState(1);
  const [selected, setSelected] = useState();
  const [correct, setCorrect] = useState();
  const [incorrect, setInCorrect] = useState(false);

  console.log(selected);
  console.log(correct);

  const handleSubmit = (e, index) => {
    setSelected(index);
    // setCounter(counter + 1);
    // getTriviaData(id, difficulty);
  };

  return (
    <View style={styles.base}>
      <View style={styles.container}>
        <View>
          <Text style={styles.headerText} h3>
            {base64.decode(category)}
          </Text>
          <Text h3 style={styles.headerText}>
            {counter} out of 10
          </Text>
        </View>
        <View>
          <Text style={styles.headerText} h4>
            {base64.decode(question)}
          </Text>
        </View>
        {all.map((e, index) => {
          console.log(e, index);
          // if (e === data[0].correct_answer){
          //   setCorrect(index)
          // }
          return (
            <TouchableOpacity
              style={styles.contentWapper}
              onPress={() => handleSubmit(e, index)}>
              <EvilIcon name={e === correctAnswer ? 'check' : null} />
              <Text style={styles.text}>{base64.decode(e)}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
      {counter > 10 ? <Modal /> : null}
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
  contentWapper: {
    textAlign: 'center',
    borderColor: 'white',
    borderWidth: 1,
    marginHorizontal: '10%',
    padding: 20,
    width: '90%',
    backgroundColor: 'white',
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
    display: 'none',
  },
});
export default TriviaQuestions;
