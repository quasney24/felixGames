import React, { useEffect } from 'react';
import { Platform, ScrollView, StyleSheet, View } from 'react-native';
import { ListItem } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import colors from 'consts/colors';
import { fetchQuizes } from 'store/reducers/quizes';
import { USER_SEARCH_SCREEN } from 'screens/routes';

const Friends = ({ navigation }) => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchQuizes());
  }, [dispatch]);

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
