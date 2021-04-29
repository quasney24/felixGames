import React, { useEffect, useState } from 'react';
import { Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Avatar, Button, ListItem } from 'react-native-elements';
import { useSelector } from 'react-redux';
import * as firebase from 'firebase';
import 'firebase/firestore';

import colors from 'consts/colors';
import { logoutUser } from 'functions/auth';
import { QUIZ_RESULTS_SCREEN } from 'screens/routes';

const Profile = ({ navigation }) => {
  const [loading, setLoading] = useState();
  const [userQuizes, setUserQuizes] = useState([]);
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    firebase
      .firestore()
      .collection('quizResults')
      .where('uid', '==', user.uid)
      .orderBy('completed', 'desc')
      .get()
      .then((querySnapshot) => {
        const quizes = [];
        querySnapshot.forEach((documentSnapshot) => {
          quizes.push({
            id: documentSnapshot.id,
            ...documentSnapshot.data(),
          });
        });
        setUserQuizes(quizes);
      });
  }, [setUserQuizes]);

  return (
    <View style={styles.container}>
      {user && (
        <>
          <View style={styles.profileHeader}>
            {user && user.photoURL ? (
              <Avatar
                overlayContainerStyle={styles.avatar}
                titleStyle={styles.avatarText}
                rounded
                size="large"
                source={{
                  uri: user.photoURL,
                }}
              />
            ) : (
              <Avatar
                overlayContainerStyle={styles.avatar}
                titleStyle={styles.avatarText}
                rounded
                size="large"
                title={user.displayName ? user.displayName.charAt(0) : ''}
              />
            )}
            <Text style={styles.userNameText}>{user.displayName}</Text>
            <View style={styles.logoutButtonContainer}>
              <Button
                buttonStyle={styles.logoutButton}
                titleStyle={{ color: colors.white }}
                textAlign="center"
                title="Logout"
                onPress={async () => {
                  logoutUser();
                }}
              />
            </View>
          </View>
          <ScrollView>
            {userQuizes.map((quiz, i) => (
              <ListItem
                key={i}
                bottomDivider
                containerStyle={styles.profileListItem}
                onPress={() => {
                  navigation.navigate(QUIZ_RESULTS_SCREEN, {
                    quizResults: quiz,
                  });
                }}>
                <ListItem.Content>
                  <ListItem.Title style={{ fontSize: 20 }}>
                    {quiz.category}
                  </ListItem.Title>
                  <ListItem.Subtitle style={{ fontSize: 16 }}>
                    {quiz.difficulty} &bull;{' '}
                    {new Date(quiz.completed).getMonth() +
                      '/' +
                      new Date(quiz.completed).getDay() +
                      '/' +
                      new Date(quiz.completed).getFullYear()}
                  </ListItem.Subtitle>
                </ListItem.Content>
                <ListItem.Content style={{ alignItems: 'flex-end' }}>
                  <ListItem.Title
                    style={
                      quiz.correct <= 5
                        ? { ...styles.resultText, ...styles.failText }
                        : quiz.correct <= 7
                        ? { ...styles.resultText, ...styles.averageText }
                        : { ...styles.resultText, ...styles.passText }
                    }>
                    {quiz.correct} / {quiz.questions.length}
                  </ListItem.Title>
                </ListItem.Content>
                <ListItem.Chevron
                  size={35}
                  name={
                    Platform.OS === 'ios'
                      ? 'ios-arrow-forward'
                      : 'chevron-right'
                  }
                />
              </ListItem>
            ))}
          </ScrollView>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
  },
  profileHeader: {
    marginVertical: 20,
    alignItems: 'center',
  },
  avatar: {
    backgroundColor: colors.primaryColor,
  },
  avatarText: {
    color: colors.white,
    textTransform: 'capitalize',
  },
  userNameText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  logoutButtonContainer: {
    marginTop: 10,
  },
  logoutButton: {
    backgroundColor: colors.primaryColor,
  },
  summaryContainer: {
    textAlign: 'center',
    alignItems: 'center',
    padding: 20,
  },
  resultText: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  failText: {
    color: colors.incorrect,
  },
  averageText: {
    color: '#FFE302',
  },
  passText: {
    color: colors.primaryColor,
  },
  categoryText: {
    fontSize: 28,
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
});

export default Profile;
