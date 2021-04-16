import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Card, ListItem } from 'react-native-elements';
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
      <Card
        containerStyle={{ borderColor: colors.primaryColor, borderRadius: 15 }}>
        <Card.Title style={styles.welcomeText}>Welcome Players!</Card.Title>
        <Text>
          Hello, and welcome to Felix Games! Start by selecting a game mode!
        </Text>
      </Card>

      <Card
        containerStyle={{
          backgroundColor: colors.primaryColor,
          borderRadius: 15,
        }}>
        <Card.Title style={styles.buttonText}>Trivia</Card.Title>
        <Card.Divider />
        {triviaOptions.map((l, i) => {
          console.log(l);
          return (
            <ListItem
              onPress={() => navigation.navigate('Trivia')}
              bottomDivider>
              <ListItem.Content>
                <ListItem.Title>{l.type}</ListItem.Title>
                <ListItem.Subtitle>{l.subType}</ListItem.Subtitle>
              </ListItem.Content>
              <ListItem.Chevron />
            </ListItem>
          );
        })}
      </Card>
      <Card>
        <Card.Title>Math Challenge</Card.Title>
        <Card.Divider />
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    textAlign: 'center',
    fontSize: 50,
    color: '#009e60',
  },
  buttons: {
    display: 'flex',
    marginHorizontal: 50,
    borderWidth: 1,
    backgroundColor: '#009e60',
    height: 75,
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 30,
    textAlign: 'center',
    color: 'white',
  },
  welcomeText: {
    fontSize: 20,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'space-evenly',
  },
});

export default Home;
