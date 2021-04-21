import React, { useContext, useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Animated,
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
import {
  forgotPassword,
  loginUser,
  logoutUser,
  registerUser,
} from 'functions/Auth';

export default function Login({}) {
  const [loading, setLoading] = useState();
  const [isRegistering, setIsRegistering] = useState();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState();
  const [username, setUsername] = useState();
  const [usernameTouched, setUsernameTouched] = useState(false);
  const [usernameValid, setUsernameValid] = useState(false);
  const usernameOpacity = useRef(new Animated.Value(0)).current;
  const { user } = useContext(AppContext);

  useEffect(() => {
    Animated.timing(usernameOpacity, {
      toValue: isRegistering ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [isRegistering, usernameOpacity]);

  const emailTranslationY = usernameOpacity.interpolate({
    inputRange: [0, 1],
    outputRange: [60, 0],
  });
  const usernameTranslationY = usernameOpacity.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 0],
  });
  const passwordTranslationY = usernameOpacity.interpolate({
    inputRange: [0, 1],
    outputRange: [20, 0],
  });
  const confirmPasswordTranslationY = usernameOpacity.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 0],
  });

  const handleRegisteration = async () => {
    if (!email) {
      Alert.alert('Please enter a email address.');
      return;
    }
    if (!username || !usernameValid) {
      Alert.alert('Please enter a valid username.');
      return;
    }
    if (username.includes(' ')) {
      Alert.alert('Username cannot have spaces.');
      return;
    }
    if (username.length >= 20) {
      Alert.alert('Username cannot be longer than 20 characters.');
      return;
    }
    if (!password || !confirmPassword) {
      Alert.alert('Please enter a password.');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Passwords must match');
      return;
    }
    setLoading(true);
    await registerUser(email, password, username);
    setLoading(false);
    setUsername('');
    setPassword('');
    setUsernameTouched(false);
  };

  const checkUsernameUniqueness = async () => {
    try {
      firebase
        .firestore()
        .collection('usernames')
        .where('lowercaseDisplayName', '==', username.toLowerCase())
        .get()
        .then((querySnapshot) => {
          setUsernameTouched(true);
          if (querySnapshot.size === 0 && username.length > 3) {
            setUsernameValid(true);
          } else {
            setUsernameValid(false);
          }
        });
    } catch (e) {
      setUsernameValid(false);
    }
  };

  return (
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
            <>
              <Animated.View
                style={[
                  styles.animatedInput,
                  styles.elevatedInput,
                  { transform: [{ translateY: emailTranslationY }] },
                ]}>
                <Input
                  autoCapitalize="none"
                  autoCorrect={false}
                  containerStyle={styles.inputContainer}
                  textContentType="emailAddress"
                  placeholder="email"
                  value={email}
                  onChangeText={setEmail}
                />
              </Animated.View>
              <Animated.View
                style={[
                  styles.animatedInput,
                  {
                    opacity: usernameOpacity,
                    transform: [{ translateY: usernameTranslationY }],
                  },
                ]}>
                {!usernameTouched ? (
                  <Input
                    autoCapitalize="none"
                    autoCorrect={false}
                    containerStyle={styles.inputContainer}
                    placeholder="username"
                    onChangeText={setUsername}
                    onFocus={() => setUsernameTouched(false)}
                    onBlur={checkUsernameUniqueness}
                  />
                ) : (
                  <Input
                    autoCapitalize="none"
                    autoCorrect={false}
                    containerStyle={styles.inputContainer}
                    placeholder="username"
                    onChangeText={setUsername}
                    onFocus={() => setUsernameTouched(false)}
                    onBlur={checkUsernameUniqueness}
                    rightIcon={
                      usernameValid
                        ? { name: 'done', color: 'green' }
                        : { name: 'clear', color: colors.accentText }
                    }
                  />
                )}
              </Animated.View>
              <Animated.View
                style={[
                  styles.animatedInput,
                  styles.elevatedInput,
                  {
                    transform: [{ translateY: passwordTranslationY }],
                  },
                ]}>
                <Input
                  containerStyle={styles.inputContainer}
                  placeholder="password"
                  onChangeText={setPassword}
                  secureTextEntry
                />
              </Animated.View>
              <Animated.View
                style={[
                  styles.animatedInput,
                  {
                    opacity: usernameOpacity,
                    transform: [{ translateY: confirmPasswordTranslationY }],
                  },
                ]}>
                <Input
                  containerStyle={styles.inputContainer}
                  placeholder="confirm password"
                  onChangeText={setConfirmPassword}
                  secureTextEntry
                />
              </Animated.View>
              <View style={styles.buttonContainer}>
                <Button
                  buttonStyle={{
                    backgroundColor: colors.primaryColor,
                  }}
                  textAlign="center"
                  title={isRegistering ? 'Register' : 'Login'}
                  onPress={async () => {
                    if (isRegistering) {
                      return handleRegisteration();
                    }
                    setLoading(true);
                    await loginUser(email, password);
                    setPassword('');
                    setLoading(false);
                  }}
                />
                <View style={styles.smallMarginTop}>
                  <Button
                    textAlign="center"
                    title={isRegistering ? 'Back to Login' : 'Register'}
                    onPress={() => setIsRegistering(!isRegistering)}
                    type="clear"
                    titleStyle={{ color: colors.primaryColor }}
                  />
                </View>
                {!isRegistering && (
                  <View style={styles.smallMarginTop}>
                    <Button
                      type="clear"
                      titleStyle={{ color: colors.primaryColor }}
                      textAlign="center"
                      title="Forgot Password?"
                      onPress={async () => {
                        setLoading(true);
                        await forgotPassword(email);
                        setLoading(false);
                      }}
                    />
                  </View>
                )}
              </View>
            </>
          </View>
        )}
        {user && (
          <View>
            <Text>Signed in as {user.displayName}</Text>
            <Text>Email: {user.email}</Text>
            <View style={styles.smallMarginTop}>
              <Button
                textAlign="center"
                title="Logout"
                onPress={async () => {
                  setLoading(true);
                  await logoutUser();
                  setLoading(false);
                  setIsRegistering(false);
                }}
                type="clear"
              />
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 20,
    backgroundColor: colors.white,
    minHeight: '100%',
  },
  loginForm: {
    width: '90%',
    paddingVertical: '3%',
    marginTop: '20%',
    alignSelf: 'center',
    height: '100%',
  },
  buttonContainer: {
    width: '60%',
    marginTop: 20,
    alignSelf: 'center',
  },
  smallMarginTop: {
    marginTop: 20,
  },
  animatedInput: {
    width: '100%',
  },
  elevatedInput: {
    zIndex: 10,
  },
});
