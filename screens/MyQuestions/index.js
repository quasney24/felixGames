import React, { useEffect } from 'react';
import { Alert, Dimensions, StyleSheet, View } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { useSelector } from 'react-redux';
import * as firebase from 'firebase';
import 'firebase/firestore';

import colors from 'consts/colors';
import MyQuestionsList from './MyQuestionsList';

const initialLayout = { width: Dimensions.get('window').width };

const MyQuestions = ({ navigation }) => {
  const user = useSelector((state) => state.user.user);
  const [myQuestions, setMyQuestions] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'pending', title: 'Pending' },
    { key: 'accepted', title: 'Accepted' },
    { key: 'declined', title: 'Declined' },
  ]);

  useEffect(() => {
    fetchMyQuestions();
  }, [user]);

  const fetchMyQuestions = async () => {
    try {
      setIsLoading(true);
      await firebase
        .firestore()
        .collection('questionSubmissions')
        .where('uid', '==', user.uid)
        .get()
        .then((querySnapshot) => {
          const questions = [];
          querySnapshot.forEach(async (documentSnapshot) => {
            const q = documentSnapshot.data();
            questions.push({ id: documentSnapshot.id, ...q });
          });
          setMyQuestions(questions);
        });
    } catch (e) {
      Alert.alert('Error');
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

  const Accepted = () => (
    <MyQuestionsList
      questions={myQuestions.filter((q) => q.status === 'Accepted')}
      isLoading={isLoading}
      status="accepted"
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
    accepted: Accepted,
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
