import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-elements';
import Axios from 'axios';

import Category from 'components/Category';
import Difficulty from 'components/Difficulty';
import { AppContext } from 'context';

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
        // if(response.data.)
        setCategoryData(response.data.trivia_categories);
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
          <Text style={styles.title} h2>
            Select a Category
          </Text>
          <Category
            data={categoryData}
            getId={(value) => getCategoryId(value)}
          />
        </View>
      ) : (
        <View style={styles.content}>
          <Text style={styles.title} h2>
            Select a Difficulty
          </Text>
          <Difficulty diff={(value) => getDifficulty(value)} />
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
    backgroundColor: '#29ab87',
    flex: 1,
  },
  content: {
    marginHorizontal: 50,
    alignContent: 'center',
    marginVertical: 20,
  },
  title: {
    color: 'white',
    textAlign: 'center',
  },
  submit: {
    height: 50,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: 'white',
    justifyContent: 'center',
    marginTop: '15%',
  },
});

export default Trivia;
