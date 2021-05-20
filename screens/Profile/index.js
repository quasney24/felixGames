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
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector } from 'react-redux';
import * as firebase from 'firebase';
import 'firebase/firestore';

import colors from 'consts/colors';
import { FRIENDS_SCREEN, QUIZ_RESULTS_LIST_SCREEN } from 'screens/routes';
import { logoutUser } from 'functions/auth';
import { fetchQuizes } from 'store/reducers/quizes';
import {
  addFriend,
  createFriendRequest,
  deleteFriendRequest,
  findFriendRequest,
  removeFriend,
} from 'functions/friends';

const Profile = ({ navigation, route }) => {
  const { displayName, userId } = route.params;
  const user = useSelector((state) => state.user.user);
  const userQuizes = useSelector((state) => state.quizes.quizes);
  const fetchingQuizes = useSelector((state) => state.quizes.isFetching);
  const [profile, setProfile] = useState(false);
  const [isFriend, setIsFriend] = useState(false);
  const [isPendingRequestFor, setIsPendingRequestFor] = useState(false);
  const [friendRequest, setFriendRequest] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    fetchUser();
  }, [dispatch]);

  const fetchUser = async () => {
    if (user !== null) {
      // return and set profile if viewing user's
      if (user.uid === userId) {
        dispatch(fetchQuizes());
        return setProfile(user);
      }
      // else retrieve user's profile
      await firebase
        .firestore()
        .collection('users')
        .where('uid', '==', userId)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach(async (documentSnapshot) => {
            const u = documentSnapshot.data();
            setProfile({ id: documentSnapshot.id, ...u });

            // return if friends
            if (u.friends.filter((f) => f.uid === user.uid).length > 0) {
              return setIsFriend(true);
            }

            // return if there is a pending request for viewing user
            const friendRequestFor = await findFriendRequest(user.uid, userId);
            if (friendRequestFor) {
              setFriendRequest(friendRequestFor);
              return setIsPendingRequestFor(true);
            }

            // lastly, check if viewing user has already sent friend request
            const friendRequestTo = await findFriendRequest(userId, user.uid);
            console.log(friendRequestTo);
            if (friendRequestTo) {
              setFriendRequest(friendRequestTo);
            }
          });
        });
    }
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
            <View style={styles.profileButtonContainer}>
              {user.uid === profile.uid && (
                <Button
                  buttonStyle={styles.profileButton}
                  titleStyle={{ color: colors.white }}
                  textAlign="center"
                  title="Logout"
                  onPress={async () => {
                    logoutUser();
                  }}
                />
              )}
              {user.uid !== profile.uid && isFriend && (
                <Button
                  buttonStyle={{
                    ...styles.profileButton,
                    backgroundColor: 'red',
                  }}
                  titleStyle={{ color: colors.white }}
                  textAlign="center"
                  title="Remove"
                  onPress={async () => {
                    removeFriend(profile, user);
                    setIsFriend(false);
                  }}
                />
              )}
              {user.uid !== profile.uid && !isFriend && !isPendingRequestFor && (
                <Button
                  buttonStyle={styles.profileButton}
                  titleStyle={{ color: colors.white }}
                  textAlign="center"
                  title={friendRequest ? 'Pending' : 'Add'}
                  onPress={async () => {
                    if (friendRequest) {
                      await deleteFriendRequest(friendRequest.id);
                      setFriendRequest();
                    } else {
                      const createdFriendRequest = await createFriendRequest(
                        profile,
                        user,
                      );
                      console.log(createFriendRequest);
                      setFriendRequest(createdFriendRequest);
                    }
                  }}
                />
              )}
              {user.uid !== profile.uid && !isFriend && isPendingRequestFor && (
                <View
                  style={{ flexDirection: 'row', justifyContent: 'center' }}>
                  <MaterialCommunityIcons
                    name="close-circle"
                    size={50}
                    color="red"
                    style={{ marginRight: '10%' }}
                    onPress={async () => {
                      await deleteFriendRequest(friendRequest.id);
                      setFriendRequest();
                      setIsPendingRequestFor(false);
                    }}
                  />
                  <MaterialCommunityIcons
                    name="check-circle"
                    size={50}
                    color={colors.primaryColor}
                    onPress={async () => {
                      await deleteFriendRequest(friendRequest.id);
                      setFriendRequest();
                      await addFriend(
                        {
                          id: friendRequest.requestToId,
                          uid: friendRequest.requestTo,
                          displayName: friendRequest.requestToName,
                        },
                        {
                          id: friendRequest.requestFromId,
                          uid: friendRequest.requestFrom,
                          displayName: friendRequest.requestFromName,
                        },
                      );
                      setIsFriend(true);
                      setIsPendingRequestFor(false);
                    }}
                  />
                </View>
              )}
            </View>
          </View>
          <ScrollView>
            {fetchingQuizes && (
              <View style={styles.loadingSpinner}>
                <ActivityIndicator size="large" color={colors.primaryColor} />
              </View>
            )}
            {!fetchingQuizes && user.uid === profile.uid && (
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
  profileButtonContainer: {
    marginTop: 20,
    width: '30%',
  },
  profileButton: {
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
