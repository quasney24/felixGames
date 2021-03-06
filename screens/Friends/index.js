import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { ListItem } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import colors from 'consts/colors';
import { PROFILE_SCREEN, USER_SEARCH_SCREEN } from 'screens/routes';
import {
  addFriend,
  deleteFriendRequest,
  getUsersFriendRequests,
} from 'functions/friends';
import { updateUserFriends } from 'store/reducers/user';
import errorMessages from 'consts/errorMessages';

const Friends = ({ navigation }) => {
  const user = useSelector((state) => state.user.user);
  const [friendRequests, setFriendRequests] = useState([]);
  const [handlingFriendRequest, setHandlingFriendRequest] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    const requests = await getUsersFriendRequests(user.uid);
    setFriendRequests(requests);
  };

  const handleAcceptFriendRequest = async (request) => {
    try {
      setHandlingFriendRequest(true);
      await deleteFriendRequest(request.id);
      setFriendRequests((prevState) =>
        prevState.filter((req) => req.id !== request.id),
      );
      await addFriend(
        {
          id: request.requestToId,
          uid: request.requestTo,
          displayName: request.requestToName,
        },
        {
          id: request.requestFromId,
          uid: request.requestFrom,
          displayName: request.requestFromName,
        },
      );
      dispatch(
        updateUserFriends([
          ...user.friends,
          {
            uid: request.requestFrom,
            displayName: request.requestFromName,
          },
        ]),
      );
    } catch (e) {
      Alert.alert(errorMessages.friendRequestAccept);
    } finally {
      setHandlingFriendRequest(false);
    }
  };

  const handleRejectFriendRequest = async (request) => {
    try {
      setHandlingFriendRequest(true);
      await deleteFriendRequest(request.id);
      setFriendRequests((prevState) =>
        prevState.filter((req) => req.id !== request.id),
      );
    } catch (e) {
      Alert.alert(errorMessages.friendRequestReject);
    } finally {
      setHandlingFriendRequest(false);
    }
  };

  return (
    <View style={styles.container}>
      {user && (
        <ScrollView>
          <ListItem
            bottomDivider
            containerStyle={styles.profileListItem}
            onPress={() => {
              navigation.navigate(USER_SEARCH_SCREEN);
            }}>
            <MaterialCommunityIcons
              name="account-search"
              size={32}
              color={colors.primaryColor}
            />
            <ListItem.Content>
              <ListItem.Title style={{ fontSize: 20 }}>Find</ListItem.Title>
            </ListItem.Content>
            <ListItem.Chevron
              size={35}
              name={
                Platform.OS === 'ios' ? 'ios-arrow-forward' : 'chevron-right'
              }
            />
          </ListItem>
          <ListItem
            bottomDivider
            containerStyle={styles.profileListItem}
            disabled>
            <MaterialCommunityIcons
              name="account-plus"
              size={32}
              color={colors.primaryColor}
            />
            <ListItem.Content>
              <ListItem.Title style={{ fontSize: 20 }}>Pending</ListItem.Title>
            </ListItem.Content>
          </ListItem>
          {friendRequests.length === 0 && (
            <ListItem
              bottomDivider
              containerStyle={styles.profileListItem}
              disabled>
              <ListItem.Content>
                <ListItem.Title style={{ fontSize: 16 }}>
                  No pending requests.
                </ListItem.Title>
              </ListItem.Content>
            </ListItem>
          )}
          {friendRequests.map((request, i) => (
            <ListItem
              bottomDivider
              containerStyle={styles.profileListItem}
              disabled
              key={request.id}>
              <ListItem.Content>
                <ListItem.Title style={{ fontSize: 20 }}>
                  {request.requestFromName}
                </ListItem.Title>
              </ListItem.Content>
              <ListItem.Content style={{ alignItems: 'flex-end' }}>
                <View style={{ flexDirection: 'row' }}>
                  {handlingFriendRequest && (
                    <View>
                      <ActivityIndicator
                        size="large"
                        color={colors.primaryColor}
                        style={styles.loadingIndicator}
                      />
                    </View>
                  )}
                  {!handlingFriendRequest && (
                    <>
                      <MaterialCommunityIcons
                        name="close-circle"
                        size={40}
                        color="red"
                        style={{ marginRight: '10%' }}
                        onPress={async () => handleRejectFriendRequest(request)}
                      />
                      <MaterialCommunityIcons
                        name="check-circle"
                        size={40}
                        color={colors.primaryColor}
                        onPress={async () => handleAcceptFriendRequest(request)}
                      />
                    </>
                  )}
                </View>
              </ListItem.Content>
            </ListItem>
          ))}
          <ListItem
            bottomDivider
            containerStyle={styles.profileListItem}
            disabled>
            <MaterialCommunityIcons
              name="account-multiple"
              size={32}
              color={colors.primaryColor}
            />
            <ListItem.Content>
              <ListItem.Title style={{ fontSize: 20 }}>
                My Friends
              </ListItem.Title>
            </ListItem.Content>
          </ListItem>
          {user.friends.length === 0 && (
            <ListItem
              bottomDivider
              containerStyle={styles.profileListItem}
              disabled>
              <ListItem.Content>
                <ListItem.Title style={{ fontSize: 16 }}>
                  Use 'Find' to search for and add users.
                </ListItem.Title>
              </ListItem.Content>
            </ListItem>
          )}
          {user.friends.map((friend, i) => (
            <ListItem
              bottomDivider
              containerStyle={styles.profileListItem}
              key={friend.uid}
              onPress={() => {
                navigation.push(PROFILE_SCREEN, {
                  displayName: friend.displayName,
                  userId: friend.uid,
                });
              }}>
              <ListItem.Content>
                <ListItem.Title style={{ fontSize: 20 }}>
                  {friend.displayName}
                </ListItem.Title>
              </ListItem.Content>
              <ListItem.Chevron
                size={35}
                name={
                  Platform.OS === 'ios' ? 'ios-arrow-forward' : 'chevron-right'
                }
              />
            </ListItem>
          ))}
        </ScrollView>
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
});

export default Friends;
