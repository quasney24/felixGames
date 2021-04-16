import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const Difficulty = ({ diff }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.box} onPress={() => diff('easy')}>
        <Text style={styles.title} h1>
          easy
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.box} onPress={() => diff('medium')}>
        <Text style={styles.title} h1>
          medium
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.box} onPress={() => diff('hard')}>
        <Text style={styles.title} h1>
          hard
        </Text>
      </TouchableOpacity>
    </View>
  );
};

//@TODO onclick fills color style
const styles = StyleSheet.create({
  box: {
    borderWidth: 1,
    borderColor: 'white',
    height: 100,
    flex: 1,
    justifyContent: 'center',
    marginTop: '5%',
    borderRadius: 15,
    marginHorizontal: '1%',
  },
  title: {
    color: 'white',
    textAlign: 'center',
    fontSize: 20,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    // alignItems: 'flex-start',
  },
});
export default Difficulty;
