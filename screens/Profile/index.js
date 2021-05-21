import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Avatar, Badge, ListItem } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import * as firebase from 'firebase';
import 'firebase/firestore';

import colors from 'consts/colors';
import { FRIENDS_SCREEN, QUIZ_RESULTS_LIST_SCREEN } from 'screens/routes';
import { fetchQuizes } from 'store/reducers/quizes';
import {
  addFriend,
  createFriendRequest,
  deleteFriendRequest,
  findFriendRequest,
  removeFriend,
} from 'functions/friends';
import { updateUserFriends } from 'store/reducers/user';
import errorMessages from 'consts/errorMessages';
import ProfileButtons from './ProfileButtons';

const Profile = ({ navigation, route }) => {
  const { displayName, userId } = route.params;
  const user = useSelector((state) => state.user.user);
  const userQuizes = useSelector((state) => state.quizes.quizes);
  const fetchingQuizes = useSelector((state) => state.quizes.isFetching);
  const [profile, setProfile] = useState(false);
  const [isFriend, setIsFriend] = useState(false);
  const [isPendingRequestFor, setIsPendingRequestFor] = useState(false);
  const [friendRequest, setFriendRequest] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
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
      try {
        setIsLoading(true);
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
              const friendRequestFor = await findFriendRequest(
                user.uid,
                userId,
              );
              if (friendRequestFor) {
                setIsPendingRequestFor(true);
                return setFriendRequest(friendRequestFor);
              }

              // lastly, check if viewing user has already sent friend request
              const friendRequestTo = await findFriendRequest(userId, user.uid);
              console.log(friendRequestTo);
              if (friendRequestTo) {
                setFriendRequest(friendRequestTo);
              }
            });
          });
      } catch (e) {
        Alert.alert(errorMessages.profileError);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleFriendRequest = async () => {
    if (friendRequest) {
      try {
        setIsLoading(true);
        await deleteFriendRequest(friendRequest.id);
        setFriendRequest();
      } catch (e) {
        Alert.alert(errorMessages.friendRequestCancel);
      } finally {
        setIsLoading(false);
      }
    } else {
      try {
        setIsLoading(true);
        const createdFriendRequest = await createFriendRequest(profile, user);
        setFriendRequest(createdFriendRequest);
      } catch (e) {
        Alert.alert(errorMessages.friendRequestAdd);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleAcceptFriendRequest = async () => {
    try {
      setIsLoading(true);
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
      dispatch(
        updateUserFriends([
          ...user.friends,
          {
            uid: friendRequest.requestFrom,
            displayName: friendRequest.requestFromName,
          },
        ]),
      );
    } catch (e) {
      Alert.alert(errorMessages.friendRequestAccept);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRejectFriendRequest = async () => {
    try {
      setIsLoading(true);
      await deleteFriendRequest(friendRequest.id);
      setFriendRequest();
      setIsPendingRequestFor(false);
    } catch (e) {
      Alert.alert(errorMessages.friendRequestReject);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveFriend = async () => {
    try {
      setIsLoading(true);
      await removeFriend(profile, user);
      dispatch(
        updateUserFriends(user.friends.filter((u) => u.uid !== profile.uid)),
      );
      setIsFriend(false);
    } catch (e) {
      Alert.alert(errorMessages.friendRemove);
    } finally {
      setIsLoading(false);
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
            {!error && (
              <ProfileButtons
                friendRequest={friendRequest}
                handleAcceptFriendRequest={handleAcceptFriendRequest}
                handleFriendRequest={handleFriendRequest}
                handleRejectFriendRequest={handleRejectFriendRequest}
                handleRemoveFriend={handleRemoveFriend}
                isFriend={isFriend}
                isLoading={isLoading}
                isPendingRequestFor={isPendingRequestFor}
                profile={profile}
                user={user}
              />
            )}
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
