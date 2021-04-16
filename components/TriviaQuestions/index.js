import React, { useState, useContext } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import base64 from 'react-native-base64';
import { Text } from 'react-native-elements';

import SuccessFail from '../SuccessFail';
import { AppContext } from 'context';
import Modal from '../Modal';

const TriviaQuestions = ({ data }) => {
  //@TODO Need to refactor this logic so this only scrambles once
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
  const { getTriviaData, id, difficulty } = useContext(AppContext);
  console.log(id, difficulty);

  const [counter, setCounter] = useState(1);
  const [selected, setSelected] = useState('');
  const [score, setScore] = useState(0);
  console.log(score);

  const handleSubmit = () => {
    setSelected('');
    setCounter(counter + 1);
    getTriviaData(id, difficulty);
  };

  return (
    <View style={styles.base}>
      {data.map((value, i) => {
        value.all = value.incorrect_answers.slice();
        value.all.push(value.correct_answer);
        console.log('new data', value);
        const shuffledData = shuffleArray(value.all);
        console.log('shuffled Data', shuffledData);

        return (
          <View style={styles.container}>
            <View>
              <Text style={styles.headerText} h3>
                {base64.decode(value.category)}
              </Text>
              <Text h3 style={styles.headerText}>
                {counter} out of 10
              </Text>
            </View>
            <View>
              <Text style={styles.headerText} h4>
                {base64.decode(value.question)}
              </Text>
            </View>
            {shuffledData.map((e) => {
              return (
                <TouchableOpacity
                  style={styles.contentWapper}
                  onPress={() => setSelected(e)}>
                  <Text style={styles.text}>{base64.decode(e)}</Text>
                </TouchableOpacity>
              );
            })}
            {selected === '' ? null : selected === value.correct_answer ? (
              <>
                <SuccessFail next={handleSubmit} result={'success'} />
              </>
            ) : (
              <>
                <SuccessFail next={handleSubmit} result={'fail'} />
              </>
            )}
          </View>
        );
      })}
      {counter > 10 ? <Modal></Modal> : null}
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
    color: '#29ab87',
    textAlign: 'center',
  },
  headerText: {
    color: 'white',
    textAlign: 'center',
  },
});
export default TriviaQuestions;
