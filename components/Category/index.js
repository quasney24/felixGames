import colors from 'consts/colors';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const Category = ({ data, getId }) => {
  return (
    <View style={styles.container}>
      {data
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((value) => {
          return (
            <View key={value.id}>
              <TouchableOpacity
                key={value.id}
                style={styles.wrapper}
                onPress={() => getId(value.id)}>
                <Text style={styles.text}>{value.name}</Text>
              </TouchableOpacity>
            </View>
          );
        })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    marginTop: 10,
  },
  wrapper: {
    borderRadius: 50,
    borderColor: colors.primaryColor,
    borderWidth: 2,
    padding: 10,
    paddingHorizontal: 20,
    backgroundColor: colors.primaryColor,
    marginHorizontal: 7,
    marginVertical: 7,
  },
  text: {
    fontSize: 18,
    color: colors.white,
    textAlign: 'center',
  },
});

export default Category;
