import colors from 'consts/colors';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const QuizSettingSelction = ({ values, selectedValue, setSelectedValue }) => {
  return (
    <View style={styles.container}>
      {values.map((v) => (
        <TouchableOpacity
          key={v}
          style={
            selectedValue === v
              ? { ...styles.box, ...styles.activeBox }
              : styles.box
          }
          onPress={() => setSelectedValue(v)}>
          <Text
            style={
              selectedValue === v
                ? { ...styles.title, ...styles.activeTitle }
                : styles.title
            }>
            {v}
          </Text>
        </TouchableOpacity>
      ))}
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
    marginVertical: '3%',
    // alignItems: 'flex-start',
  },
});
export default QuizSettingSelction;
