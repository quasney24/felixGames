import React, { useEffect } from 'react';
import { Alert, Dimensions, StyleSheet, View } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { useSelector } from 'react-redux';

import colors from 'consts/colors';
import MyQuestionsList from './MyQuestionsList';
import { getMyQuestions } from 'functions/questions';
import errorMessages from 'consts/errorMessages';

const initialLayout = { width: Dimensions.get('window').width };

const MyQuestions = ({ navigation }) => {
  const user = useSelector((state) => state.user.user);
  const [myQuestions, setMyQuestions] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'pending', title: 'Pending' },
    { key: 'approved', title: 'Approved' },
    { key: 'declined', title: 'Declined' },
  ]);

  useEffect(() => {
    fetchMyQuestions();
  }, [user]);

  const fetchMyQuestions = async () => {
    try {
      setIsLoading(true);
      setMyQuestions(await getMyQuestions(user.uid));
    } catch {
      Alert.alert(errorMessages.myQuestionsError);
    } finally {
      setIsLoading(false);
    }
  };

  const Pending = () => (
    <MyQuestionsList
      questions={myQuestions.filter((q) => q.status === 'Review')}
      isLoading={isLoading}
      status="pending"
    />
  );

  const Approved = () => (
    <MyQuestionsList
      questions={myQuestions.filter((q) => q.status === 'Approved')}
      isLoading={isLoading}
      status="approved"
    />
  );

  const Declined = () => (
    <MyQuestionsList
      questions={myQuestions.filter((q) => q.status === 'Declined')}
      isLoading={isLoading}
      status="declined"
    />
  );

  const renderScene = SceneMap({
    pending: Pending,
    approved: Approved,
    declined: Declined,
  });

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      style={styles.tabBarStyle}
      indicatorStyle={styles.indicatorStyle}
      labelStyle={styles.labelStyle}
    />
  );

  return (
    <View style={styles.container}>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={initialLayout}
        renderTabBar={renderTabBar}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  tabBarStyle: {
    backgroundColor: colors.primaryColor,
  },
  indicatorStyle: {
    backgroundColor: 'white',
  },
  labelStyle: {
    textTransform: 'capitalize',
  },
});

export default MyQuestions;
