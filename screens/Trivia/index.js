import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-elements';
import Axios from 'axios';

import Category from 'components/Category';
import Difficulty from 'components/Difficulty';
import { AppContext } from 'context';
import colors from 'consts/colors';
import { diff } from 'react-native-reanimated';

const Trivia = ({ navigation }) => {
  const { getTriviaData } = useContext(AppContext);

  const [categoryData, setCategoryData] = useState([]);
  const [difficulty, setDifficulty] = useState('');
  const [categoryId, setCategoryId] = useState();
  const [phaseTwo, setPhaseTwo] = useState(false);

  //@TODO refactor this to include in context
  useEffect(() => {
    const getAllCategoryData = async () => {
      Axios.get('https://opentdb.com/api_category.php').then((response) => {
        const categories = [];
        response.data.trivia_categories.forEach((cat) => {
          cat.name = cat.name.replace('Entertainment: ', '');
          cat.name = cat.name.replace('Science: ', '');
          categories.push(cat);
        });
        setCategoryData(categories);
      });
    };
    getAllCategoryData();
  }, []);

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
    navigation.navigate('TriviaQ');
  };

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
            <Text h1 style={styles.title}>
              start
            </Text>
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
