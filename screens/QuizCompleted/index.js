import React, { useContext } from 'react';
import { ScrollView, Text } from 'react-native';
import QuestionCard from 'components/QuestionCard';
import { AppContext } from 'context';
import colors from 'consts/colors';

//TODO complete this screen when we have a data store
const QuizCompleted = ({ navigation, route }) => {
  const { user } = useContext(AppContext);
  const { results } = route.params;

  return (
    <ScrollView style={{ backgroundColor: colors.white }}>
      <Text>
        {results.correct} / {results.questions.length}
      </Text>
      <Text>{results.category}</Text>
      <Text>{results.difficulty}</Text>
      {results.questions.map((q) => {
        console.log(q);
        return <QuestionCard key={q.question} question={q} />;
      })}
    </ScrollView>
  );
};

export default QuizCompleted;
