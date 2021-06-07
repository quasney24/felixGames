import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { BottomSheet, Button, Input, Text } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';

import Category from 'components/Category';
import colors from 'consts/colors';
import { fetchQuizCategories } from 'store/reducers/quizCategories';
import QuizSettingSelction from 'components/QuizSettingSelction';

const QuestionSubmit = ({ navigation }) => {
  const [category, setCategory] = useState();
  const [difficulty, setDifficulty] = useState();
  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const categories = useSelector((state) => state.quizCategories.categories);
  const dispatch = useDispatch();

  useEffect(() => {
    if (categories.length === 0) {
      dispatch(fetchQuizCategories());
    }
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.form}>
        <Text style={styles.inputTitle}>Category</Text>
        <View style={{ marginVertical: 15 }}>
          {category && (
            <TouchableOpacity
              style={styles.wrapper}
              onPress={() => setShowBottomSheet(true)}>
              <Text style={styles.text}>{category}</Text>
            </TouchableOpacity>
          )}
          {!category && (
            <Button
              buttonStyle={styles.wrapper}
              title="Select"
              onPress={() => setShowBottomSheet(true)}
            />
          )}
        </View>
        <Text style={styles.inputTitle}>Difficulty</Text>
        <QuizSettingSelction
          values={['easy', 'medium', 'hard']}
          selectedValue={difficulty}
          setSelectedValue={(value) => {
            setDifficulty(value);
          }}
        />
        <Text style={styles.inputTitle}>Question</Text>
        <Input containerStyle={styles.inputContainer} value="" multiline />
        <Text style={styles.inputTitle}>Correct Answer</Text>
        <Input containerStyle={styles.inputContainer} value="" />
        <Text style={styles.inputTitle}>Incorrect Answers</Text>
        <Input containerStyle={styles.inputContainer} value="" />
        <Input containerStyle={styles.inputContainer} value="" />
        <Input containerStyle={styles.inputContainer} value="" />
      </View>
      <BottomSheet
        modalProps={{ visible: showBottomSheet }}
        containerStyle={styles.bottomSheetContainer}>
        <View style={styles.bottomSheetContentContainer}>
          <Text style={styles.title}>Select a Category</Text>
          <Category
            data={categories}
            getId={(id) => {
              setCategory(categories.filter((cat) => cat.id === id)[0].name);
              setShowBottomSheet(false);
            }}
          />
        </View>
      </BottomSheet>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
  },
  form: {
    width: '90%',
    paddingVertical: '3%',
    marginTop: '5%',
    alignSelf: 'center',
    height: '100%',
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
  inputTitle: {
    fontSize: 18,
    marginLeft: 5,
  },
  bottomSheetContainer: {
    backgroundColor: colors.white,
  },
  bottomSheetContentContainer: {
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
});

export default QuestionSubmit;
