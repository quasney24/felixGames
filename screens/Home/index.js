import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Card, ListItem } from 'react-native-elements';

import { QUESTION_SUBMIT, TRIVIA_SCREEN } from 'screens/routes';
import colors from 'consts/colors';

const Home = ({ navigation }) => {
  //@TODO refactor app to build factory pattern style utilizing classes for game types
  const triviaOptions = [
    {
      type: 'Accuracy',
      subType: 'Get them all Right!',
    },
    {
      type: 'Speed',
      subType: 'Better go fast!',
    },
  ];

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
        {triviaOptions.map((l, i) => {
          console.log(l);
          return (
            <ListItem
              key={l.type}
              onPress={() => navigation.navigate(TRIVIA_SCREEN)}
              bottomDivider>
              <ListItem.Content>
                <ListItem.Title>{l.type}</ListItem.Title>
                <ListItem.Subtitle>{l.subType}</ListItem.Subtitle>
              </ListItem.Content>
              <ListItem.Chevron color={colors.primaryColor} size={32} />
            </ListItem>
          );
        })}
        <ListItem
          onPress={() => navigation.navigate(QUESTION_SUBMIT)}
          bottomDivider>
          <ListItem.Content>
            <ListItem.Title>Submit a Question</ListItem.Title>
            <ListItem.Subtitle>Contribute your knowledge!</ListItem.Subtitle>
          </ListItem.Content>
          <ListItem.Chevron color={colors.primaryColor} size={32} />
        </ListItem>
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
