import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Avatar, Badge, Button, ListItem } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import * as firebase from 'firebase';
import 'firebase/firestore';

import colors from 'consts/colors';
import { FRIENDS_SCREEN, QUIZ_RESULTS_LIST_SCREEN } from 'screens/routes';
import { logoutUser } from 'functions/auth';
import { fetchQuizes } from 'store/reducers/quizes';

const Profile = ({ navigation, route }) => {
  const { displayName, userId } = route.params;
  const user = useSelector((state) => state.user.user);
  const userQuizes = useSelector((state) => state.quizes.quizes);
  const fetchingQuizes = useSelector((state) => state.quizes.isFetching);
  const [profile, setProfile] = useState(false);
  const [viewingUserId, setViewingUserId] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    fetchUser();
  }, [dispatch]);

  const fetchUser = async () => {
    if (user !== null) {
      if (user.uid === userId) {
        dispatch(fetchQuizes());
        setViewingUserId(user.uid);
        return setProfile(user);
      }
    }
    await firebase
      .firestore()
      .collection('users')
      .where('uid', '==', userId)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((documentSnapshot) => {
          const u = documentSnapshot.data();
          setProfile({ id: documentSnapshot.id, ...u });
        });
      });
  };

  return (
    <View style={styles.container}>
      {user && (
        <>
          <View style={styles.profileHeader}>
            {profile && profile.photoURL ? (
              <Avatar
                overlayContainerStyle={styles.avatar}
                titleStyle={styles.avatarText}
                rounded
                size="large"
                source={{
                  uri: profile.photoURL,
                }}
              />
            ) : (
              <Avatar
                overlayContainerStyle={styles.avatar}
                titleStyle={styles.avatarText}
                rounded
                size="large"
                title={profile.displayName ? profile.displayName.charAt(0) : ''}
              />
            )}
            <Text style={styles.userNameText}>{profile.displayName}</Text>
            {viewingUserId === user.uid && (
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
            )}
          </View>
          <ScrollView>
            {fetchingQuizes && (
              <View style={styles.loadingSpinner}>
                <ActivityIndicator size="large" color={colors.primaryColor} />
              </View>
            )}
            {!fetchingQuizes && viewingUserId === profile.uid && (
              <>
                <ListItem
                  bottomDivider
                  containerStyle={styles.profileListItem}
                  onPress={() => {
                    navigation.navigate(QUIZ_RESULTS_LIST_SCREEN);
                  }}>
                  <ListItem.Content>
                    <ListItem.Title style={{ fontSize: 20 }}>
                      Quizzes
                    </ListItem.Title>
                  </ListItem.Content>
                  <ListItem.Content style={{ alignItems: 'flex-end' }}>
                    <Badge
                      value={userQuizes.length}
                      badgeStyle={styles.listItemBadge}
                    />
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
                <ListItem
                  bottomDivider
                  containerStyle={styles.profileListItem}
                  onPress={() => {
                    navigation.navigate(FRIENDS_SCREEN);
                  }}>
                  <ListItem.Content>
                    <ListItem.Title style={{ fontSize: 20 }}>
                      Friends
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
              </>
            )}
          </ScrollView>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
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
  listItemBadge: {
    backgroundColor: colors.primaryColor,
    minHeight: 35,
    minWidth: 35,
    borderRadius: 50,
    padding: 5,
    borderWidth: 0,
  },
});

export default Profile;
