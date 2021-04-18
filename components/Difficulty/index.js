import colors from 'consts/colors';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const Difficulty = ({ diff, setDiff }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={
          diff === 'easy' ? { ...styles.box, ...styles.activeBox } : styles.box
        }
        onPress={() => setDiff('easy')}>
        <Text
          style={
            diff === 'easy'
              ? { ...styles.title, ...styles.activeTitle }
              : styles.title
          }>
          easy
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={
          diff === 'medium'
            ? { ...styles.box, ...styles.activeBox }
            : styles.box
        }
        onPress={() => setDiff('medium')}>
        <Text
          style={
            diff === 'medium'
              ? { ...styles.title, ...styles.activeTitle }
              : styles.title
          }>
          medium
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={
          diff === 'hard' ? { ...styles.box, ...styles.activeBox } : styles.box
        }
        onPress={() => setDiff('hard')}>
        <Text
          style={
            diff === 'hard'
              ? { ...styles.title, ...styles.activeTitle }
              : styles.title
          }>
          hard
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    borderWidth: 3,
    borderColor: colors.primaryColor,
    height: 100,
    flex: 1,
    justifyContent: 'center',
    marginTop: '5%',
    borderRadius: 15,
    marginHorizontal: '1%',
    backgroundColor: colors.white,
  },
  activeBox: {
    backgroundColor: colors.primaryColor,
  },
  title: {
    color: colors.primaryColor,
    textAlign: 'center',
    fontSize: 20,
  },
  activeTitle: {
    color: colors.white,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: '5%',
    // alignItems: 'flex-start',
  },
});
export default Difficulty;
