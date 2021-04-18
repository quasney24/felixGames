import React, { useState, useContext } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { HeaderBackButton } from '@react-navigation/stack';
import { Text } from 'react-native-elements';

import Category from 'components/Category';
import Difficulty from 'components/Difficulty';
import { AppContext } from 'context';
import { TRIVIAQ_SCREEN } from 'screens/routes';
import colors from 'consts/colors';

const Trivia = ({ navigation }) => {
  const { categoryData, getTriviaData } = useContext(AppContext);

  const [difficulty, setDifficulty] = useState('');
  const [categoryId, setCategoryId] = useState();
  const [phaseTwo, setPhaseTwo] = useState(false);

  const getCategoryId = (value) => {
    console.log(value);
    setCategoryId(value);
    setPhaseTwo(true);
  };
  const getDifficulty = (value) => {
    console.log(value);
    setDifficulty(value);
  };
  const handleSubmit = () => {
    getTriviaData(categoryId, difficulty);
    navigation.navigate(TRIVIAQ_SCREEN);
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <HeaderBackButton
          tintColor={colors.white}
          onPress={() => {
            if (phaseTwo) {
              return setPhaseTwo(false);
            }
            navigation.goBack();
          }}
        />
      ),
    });
  }, [navigation, phaseTwo]);

  return (
    <ScrollView style={styles.wrapper}>
      {phaseTwo === false ? (
        <View style={styles.content}>
          <Text style={styles.title}>Select a Category</Text>
          <Category
            data={categoryData}
            getId={(value) => getCategoryId(value)}
          />
        </View>
      ) : (
        <View style={styles.content}>
          <Text style={styles.title}>Select a Difficulty</Text>
          <Difficulty
            diff={difficulty}
            setDiff={(value) => getDifficulty(value)}
          />
          <TouchableOpacity style={styles.submit} onPress={handleSubmit}>
            <Text style={styles.title}>start</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    textAlign: 'center',
    backgroundColor: colors.white,
    flex: 1,
  },
  content: {
    marginHorizontal: 20,
    alignContent: 'center',
    marginVertical: 20,
  },
  title: {
    color: colors.primaryColor,
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
  },
  submit: {
    height: 75,
    borderWidth: 3,
    borderRadius: 15,
    borderColor: colors.primaryColor,
    justifyContent: 'center',
    marginTop: '10%',
  },
});

export default Trivia;
