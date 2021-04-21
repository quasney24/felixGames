import React, { useContext, useEffect, useState } from 'react';
import {
  Alert,
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Button, Input } from 'react-native-elements';
import * as firebase from 'firebase';
import 'firebase/firestore';

import { AppContext } from 'context';
import colors from 'consts/colors';

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { user } = useContext(AppContext);

  useEffect(() => {
    console.log(user);
  }, [user]);

  async function signIn(email, password) {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      Alert.alert('Logged in');
    } catch (err) {
      Alert.alert('There is something wrong!', err.message);
    }
  }

  async function signOut() {
    try {
      await firebase.auth().signOut();
      Alert.alert('Logged out');
    } catch (err) {
      Alert.alert('There is something wrong!', err.message);
    }
  }

  return (
    <>
      <SafeAreaView>
        <ScrollView contentContainerStyle={styles.container}>
          {!user && (
            <View style={styles.loginForm}>
              <Input
                inputContainerStyle={styles.inputContainer}
                placeholder="email"
                onChangeText={setEmail}
                autoCapitalize="none"
                autoCorrect={false}
                value={email}
              />
              <Input
                inputContainerStyle={styles.inputContainer}
                placeholder="password"
                onChangeText={setPassword}
                secureTextEntry={true}
              />
              <View style={styles.buttonContainer}>
                <Button
                  title="Login"
                  onPress={() => signIn(email, password)}
                  buttonStyle={{ backgroundColor: colors.lightAccent }}
                />
              </View>
            </View>
          )}
          {user && (
            <View>
              <Text>Signed in as {user.name}</Text>
              <View style={styles.buttonContainer}>
                <Button
                  title="Logout"
                  onPress={() => signOut()}
                  buttonStyle={{ backgroundColor: colors.lightAccent }}
                />
              </View>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 20,
    backgroundColor: colors.primaryBackground,
    minHeight: '100%',
  },
  loginForm: {
    width: '90%',
    paddingVertical: '3%',
    alignSelf: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  image: {
    width: Dimensions.get('window').width / 1.1,
    height: 200,
    alignSelf: 'center',
    borderRadius: 20,
    marginBottom: 20,
  },
  inputContainer: {
    borderBottomWidth: 1,
    borderBottomColor: 'black',
  },
  inputLabelText: {
    fontSize: 16,
  },
  buttonContainer: {
    width: '50%',
    marginTop: 20,
    alignSelf: 'center',
    backgroundColor: colors.primaryColor,
  },
});
