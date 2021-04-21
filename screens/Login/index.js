import React, { useContext, useState } from 'react';
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Button, Input } from 'react-native-elements';
import 'firebase/firestore';

import { AppContext } from 'context';
import colors from 'consts/colors';
import { ActivityIndicator } from 'react-native';

export default function Login({ navigation }) {
  const [isRegistering, setIsRegistering] = useState();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { user, loading, loginUser, logoutUser, resetPassword } = useContext(
    AppContext,
  );

  return (
    <>
      <SafeAreaView>
        <ScrollView contentContainerStyle={styles.container}>
          {loading && (
            <View style={styles.keyboardAvoider}>
              <ActivityIndicator
                size="large"
                color={colors.accentText}
                style={styles.loadingIndicator}
              />
            </View>
          )}
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
                <View style={{ marginBottom: 20 }}>
                  <Button
                    buttonStyle={{
                      backgroundColor: colors.primaryColor,
                    }}
                    textAlign="center"
                    title={isRegistering ? 'Register' : 'Login'}
                    onPress={() => {
                      if (isRegistering) {
                        // signup
                      }
                      loginUser(email, password);
                    }}
                  />
                </View>
                <View style={{ marginBottom: 20 }}>
                  <Button
                    textAlign="center"
                    title={isRegistering ? 'Back to Login' : 'Register'}
                    onPress={() => setIsRegistering(!isRegistering)}
                    type="clear"
                    titleStyle={{ color: colors.primaryColor }}
                  />
                </View>
                {!isRegistering && (
                  <Button
                    type="clear"
                    titleStyle={{ color: colors.primaryColor }}
                    textAlign="center"
                    title="Forgot Password?"
                    onPress={() => resetPassword(email)}
                  />
                )}
              </View>
            </View>
          )}
          {user && (
            <View>
              <Text>Signed in as {user.name}</Text>
              <View style={styles.buttonContainer}>
                <Button
                  title="Logout"
                  onPress={() => logoutUser()}
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
  },
});
