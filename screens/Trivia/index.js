import React, { useState, useEffect } from 'react';
import {
  ActivityIndicator,
  Alert,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { HeaderBackButton } from '@react-navigation/stack';
import { Text } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';

import Category from 'components/Category';
import QuizSettingSelction from 'components/QuizSettingSelction';
import { getTriviaData } from 'functions/quiz';
import { fetchQuizCategories } from 'store/reducers/quizCategories';
import { TRIVIAQ_SCREEN } from 'screens/routes';
import colors from 'consts/colors';
import errorMessages from 'consts/errorMessages';

const Trivia = ({ navigation }) => {
  const [difficulty, setDifficulty] = useState('');
  const [time, setTime] = useState(0);
  const [category, setCategory] = useState();
  const [loading, setLoading] = useState(false);
  const [phaseTwo, setPhaseTwo] = useState(false);
  const categories = useSelector((state) => state.quizCategories.categories);
  const fetchingCategories = useSelector(
    (state) => state.quizCategories.isFetching,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (categories.length === 0) {
      dispatch(fetchQuizCategories());
    }
  }, []);

  const handleSubmit = async () => {
    setLoading(true);
    const triviaData = await getTriviaData(category, difficulty);
    setLoading(false);
    if (triviaData.questions.length < 10) {
      Alert.alert(errorMessages.quizQuestions);
    } else {
      navigation.navigate(TRIVIAQ_SCREEN, {
        triviaData,
        timePerQuestion: time,
      });
    }
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
            data={categories}
            getId={(value) => {
              setCategory(value);
              setPhaseTwo(true);
            }}
          />
        </View>
      ) : (
        <>
          <View style={styles.content}>
            <Text style={styles.title}>Difficulty</Text>
            <QuizSettingSelction
              values={['easy', 'medium', 'hard']}
              selectedValue={difficulty}
              setSelectedValue={(value) => setDifficulty(value)}
            />
          </View>
          <View style={styles.content}>
            <Text style={styles.title}>Time</Text>
            <QuizSettingSelction
              values={[0, 10, 20]}
              selectedValue={time}
              setSelectedValue={(value) => setTime(value)}
            />
            {!loading && (
              <TouchableOpacity style={styles.submit} onPress={handleSubmit}>
                <Text style={styles.title}>start</Text>
              </TouchableOpacity>
            )}
          </View>
        </>
      )}
      {(loading || fetchingCategories) && (
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
    marginVertical: '3%',
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
