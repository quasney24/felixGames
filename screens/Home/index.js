import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Card, ListItem } from 'react-native-elements';

import colors from 'consts/colors';
import { homeMenuOptions } from 'functions/menuOptions';

const Home = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Card containerStyle={{ ...styles.cardContainer, ...styles.welcomeCard }}>
        <Card.Title style={{ ...styles.headerText, ...styles.centerText }}>
          Welcome Players
        </Card.Title>
        <Text style={styles.centerText}>
          Hello, and welcome to Felix Games! Start by selecting a game mode.
        </Text>
      </Card>

      <Card
        containerStyle={{
          ...styles.cardContainer,
          backgroundColor: colors.primaryColor,
        }}>
        <Card.Title
          style={{
            ...styles.headerText,
            ...styles.centerText,
            color: colors.white,
          }}>
          Trivia
        </Card.Title>
        <Card.Divider style={styles.cardDivider} />
        {homeMenuOptions.map((option) => (
          <ListItem
            key={option.title}
            onPress={() => navigation.navigate(option.navigation)}
            bottomDivider>
            <ListItem.Content>
              <ListItem.Title>{option.title}</ListItem.Title>
              <ListItem.Subtitle>{option.subtitle}</ListItem.Subtitle>
            </ListItem.Content>
            <ListItem.Chevron color={colors.primaryColor} size={32} />
          </ListItem>
        ))}
      </Card>

      <Card containerStyle={styles.cardContainer}>
        <Card.Title style={{ ...styles.headerText, ...styles.centerText }}>
          Math Challenge
        </Card.Title>
        <Card.Divider />
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  // header: {
  //   textAlign: 'center',
  //   fontSize: 50,
  //   color: '#009e60',
  // },
  // buttons: {
  //   display: 'flex',
  //   marginHorizontal: 50,
  //   borderWidth: 1,
  //   backgroundColor: '#009e60',
  //   height: 75,
  //   justifyContent: 'center',
  // },
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  headerText: {
    fontSize: 22,
  },
  centerText: {
    textAlign: 'center',
  },
  cardContainer: {
    borderRadius: 15,
    marginTop: 30,
  },
  cardDivider: {
    backgroundColor: colors.white,
    height: 1,
  },
  welcomeCard: {
    borderColor: colors.primaryColor,
    borderWidth: 3,
  },
});

export default Home;
