import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Category = ({ data, getId }) => {
  return (
    <View style={styles.container}>
      {data.map((value) => {
        return (
          <View>
            <TouchableOpacity
              style={styles.wrapper}
              onPress={() => getId(value.id)}>
              <Text>{value.name}</Text>
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
  },
  wrapper: {
    borderRadius: 10,
    borderWidth: 1,
    padding: 10,
    backgroundColor: 'white',
    margin: '2%',
  },
  title: {
    textAlign: 'center',
  },
});

export default Category;
