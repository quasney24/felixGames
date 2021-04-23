import React, { useState, useContext, useEffect } from 'react';
import {
  ActivityIndicator,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { HeaderBackButton } from '@react-navigation/stack';
import { Text } from 'react-native-elements';

import Category from 'components/Category';
import Difficulty from 'components/Difficulty';
import { AppContext } from 'context';
import { TRIVIAQ_SCREEN } from 'screens/routes';
import colors from 'consts/colors';

const Trivia = ({ navigation }) => {
  const { categoryData, getAllCategoryData, getTriviaData } = useContext(
    AppContext,
  );

  const [difficulty, setDifficulty] = useState('');
  const [categoryId, setCategoryId] = useState();
  const [loading, setLoading] = useState(false);
  const [phaseTwo, setPhaseTwo] = useState(false);

  useEffect(() => {
    getCategories();
  }, [categoryData]);

  const getCategories = async () => {
    if (categoryData.length === 0) {
      setLoading(true);
      await getAllCategoryData();
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    console.log(categoryId, difficulty);
    setLoading(true);
    await getTriviaData(categoryId, difficulty);
    setLoading(false);
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
            getId={(value) => {
              setCategoryId(value);
              setPhaseTwo(true);
            }}
          />
        </View>
      ) : (
        <View style={styles.content}>
          <Text style={styles.title}>Select a Difficulty</Text>
          <Difficulty
            diff={difficulty}
            setDiff={(value) => setDifficulty(value)}
          />
          {!loading && (
            <TouchableOpacity style={styles.submit} onPress={handleSubmit}>
              <Text style={styles.title}>start</Text>
            </TouchableOpacity>
          )}
        </View>
      )}
      {loading && (
        <View style={styles.loadingSpinner}>
          <ActivityIndicator size="large" color={colors.primaryColor} />
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
  loadingSpinner: {
    height: 75,
    justifyContent: 'center',
    marginTop: '10%',
  },
});

export default Trivia;
