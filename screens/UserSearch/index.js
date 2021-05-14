import React, { useState } from 'react';
import { StyleSheet, FlatList, View, Platform } from 'react-native';
import {
  Button,
  Text,
  SearchBar,
  ListItem,
  Icon,
  Avatar,
} from 'react-native-elements';
import * as firebase from 'firebase';
import 'firebase/firestore';

import colors from 'consts/colors';
import { PROFILE_SCREEN } from 'screens/routes';

const UserSearch = ({ navigation }) => {
  const [searchInput, setSearchInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  return (
    <View style={styles.container}>
      <SearchBar
        containerStyle={styles.search}
        value={searchInput}
        onChangeText={setSearchInput}
        placeholder="Username"
        lightTheme
        clearIcon={
          <Icon
            name="close"
            color="white"
            underlayColor="rgba(255,255,255,0)"
            containerStyle={styles.controlsIconContainer}
            onPress={() => {
              setSearchInput('');
              setIsSearching(false);
            }}
          />
        }
        searchIcon={
          <Button
            title="Search"
            buttonStyle={styles.searchButton}
            onPress={async () => {
              if (searchInput.length === 0) {
                return setIsSearching(false);
              }
              setIsSearching(true);
              setLoading(true);
              await firebase
                .firestore()
                .collection('users')
                .where('lowercaseDisplayName', '>=', searchInput.toLowerCase())
                .where(
                  'lowercaseDisplayName',
                  '<=',
                  searchInput.toLowerCase() + '\uf8ff',
                )
                .orderBy('lowercaseDisplayName', 'desc')
                .limit(25)
                .get()
                .then((querySnapshot) => {
                  console.log('enter');
                  const users = [];
                  querySnapshot.forEach((documentSnapshot) => {
                    users.push(documentSnapshot.data());
                  });
                  setSearchResults(users);
                })
                .finally(() => {
                  setLoading(false);
                });
            }}
          />
        }
      />
      <View style={styles.titleContainer}>
        {isSearching && searchResults.length === 0 && !loading && (
          <Text style={[styles.textBoldStyle, styles.noResultsText]}>
            No results found.
          </Text>
        )}
      </View>
      <FlatList
        bounces={false}
        scrollEventThrottle={100}
        data={searchResults}
        keyExtractor={(newUser) => newUser.uid}
        refreshing={loading}
        renderItem={({ item }) => (
          <ListItem
            containerStyle={styles.profileListItem}
            onPress={() => {
              navigation.navigate(PROFILE_SCREEN, {
                displayName: item.displayName,
                userId: item.uid,
              });
            }}
            bottomDivider>
            {item.photoURL ? (
              <Avatar
                rounded
                size="small"
                source={{
                  uri: item.photoURL,
                }}
              />
            ) : (
              <Avatar
                rounded
                size="small"
                title={item.displayName ? item.displayName.charAt(0) : ''}
              />
            )}
            <ListItem.Content>
              <ListItem.Title style={{ fontSize: 20 }}>
                {item.displayName}
              </ListItem.Title>
            </ListItem.Content>
            <ListItem.Chevron
              size={35}
              name={
                Platform.OS === 'ios' ? 'ios-arrow-forward' : 'chevron-right'
              }
            />
          </ListItem>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    paddingHorizontal: '2.5%',
    paddingTop: '2.5%',
    flex: 1,
    height: '100%',
    width: '100%',
  },
  search: {
    width: '100%',
  },
  searchButton: {
    borderRadius: 0,
    margin: 0,
  },
  titleContainer: {
    padding: 10,
    alignItems: 'center',
  },
  textBoldStyle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  noResultsText: {
    marginTop: 10,
    color: colors.primaryText,
  },
  profileListItem: {
    backgroundColor: 'rgba(150, 143, 139, 0.2)',
  },
});

export default UserSearch;
