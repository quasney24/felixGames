import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';

import { AppContext } from 'context';
import TriviaQuestions from 'components/TriviaQuestions';

const TriviaQ = () => {
  const { triviaData } = useContext(AppContext);
  return (
    <View style={styles.container}>
      <TriviaQuestions data={triviaData} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#29ab87',
  },
});

export default TriviaQ;
