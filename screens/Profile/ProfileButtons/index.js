import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { Button } from 'react-native-elements';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import colors from 'consts/colors';
import { logoutUser } from 'functions/auth';

const ProfileButtons = ({
  friendRequest,
  handleAcceptFriendRequest,
  handleRemoveFriend,
  handleFriendRequest,
  handleRejectFriendRequest,
  isFriend,
  isLoading,
  isPendingRequestFor,
  profile,
  user,
}) => {
  return (
    <View style={styles.profileButtonContainer}>
      {isLoading && (
        <View>
          <ActivityIndicator
            size="large"
            color={colors.primaryColor}
            style={styles.loadingIndicator}
          />
        </View>
      )}
      {user.uid === profile.uid && !isLoading && (
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
      {user.uid !== profile.uid && isFriend && !isLoading && (
        <Button
          buttonStyle={{
            ...styles.profileButton,
            backgroundColor: colors.incorrect,
          }}
          titleStyle={{ color: colors.white }}
          textAlign="center"
          title="Remove"
          onPress={handleRemoveFriend}
        />
      )}
      {user.uid !== profile.uid &&
        !isFriend &&
        !isPendingRequestFor &&
        !isLoading && (
          <Button
            buttonStyle={styles.profileButton}
            titleStyle={{ color: colors.white }}
            textAlign="center"
            title={friendRequest ? 'Pending' : 'Add'}
            onPress={handleFriendRequest}
          />
        )}
      {user.uid !== profile.uid &&
        !isFriend &&
        isPendingRequestFor &&
        !isLoading && (
          <View style={styles.friendRequestButtons}>
            <MaterialCommunityIcons
              name="close-circle"
              size={50}
              color="red"
              style={{ marginRight: '10%' }}
              onPress={handleRejectFriendRequest}
            />
            <MaterialCommunityIcons
              name="check-circle"
              size={50}
              color={colors.primaryColor}
              onPress={handleAcceptFriendRequest}
            />
          </View>
        )}
    </View>
  );
};

const styles = StyleSheet.create({
  profileButtonContainer: {
    marginTop: 20,
    width: '30%',
  },
  profileButton: {
    backgroundColor: colors.primaryColor,
  },
  friendRequestButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

export default ProfileButtons;
