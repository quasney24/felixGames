import { Alert } from 'react-native';
import * as firebase from 'firebase';
import 'firebase/firestore';

export const registerUser = async (email, password, username) => {
  try {
    const {
      user: registeredUser,
    } = await firebase.auth().createUserWithEmailAndPassword(email, password);

    firebase
      .firestore()
      .collection('users')
      .add({
        email: registeredUser.email,
        emailVerified: registeredUser.emailVerified,
        creationTime: registeredUser.metadata.creationTime,
        photoURL: registeredUser.photoURL,
        uid: registeredUser.uid,
        displayName: username,
        lowercaseDisplayName: username.toLowerCase(),
        followers: [],
        following: [],
      })
      .then(() => {});
    firebase
      .firestore()
      .collection('usernames')
      .add({
        lowercaseDisplayName: username.toLowerCase(),
      })
      .then(() => {});
  } catch (e) {
    if (e.code === 'auth/email-already-in-use') {
      Alert.alert('That email address is already in use!');
    } else if (e.code === 'auth/invalid-email') {
      Alert.alert('That email address is invalid!');
    } else {
      Alert.alert('An unknown error occured.');
    }
    console.log(e);
  }
};

export const loginUser = async (email, password) => {
  if (!email) {
    Alert.alert('Please enter a email address.');
    return;
  }
  if (!password) {
    Alert.alert('Please enter a password.');
    return;
  }
  try {
    await firebase.auth().signInWithEmailAndPassword(email, password);
  } catch (e) {
    if (e.code === 'auth/email-already-in-use') {
      Alert.alert('That email address is already in use!');
    } else if (e.code === 'auth/invalid-email') {
      Alert.alert('That email address is invalid!');
    } else if (e.code === 'auth/wrong-password') {
      Alert.alert('Incorrect password!');
    } else {
      Alert.alert('An unknown error occured.');
    }
  }
};

export const logoutUser = async () => {
  try {
    await firebase.auth().signOut();
  } catch (err) {
    Alert.alert('Trouble logging out.');
  }
};

export const forgotPassword = async (email) => {
  if (!email) {
    return Alert.alert(
      'Please enter a email address and click this button again.',
    );
  }
  try {
    await firebase.auth().sendPasswordResetEmail(email);
    Alert.alert('Please check your email for next steps.');
  } catch (e) {
    if (e.code === 'auth/user-not-found') {
      Alert.alert('Sorry, no user associated to that email.');
    } else if (e.code === 'auth/invalid-email') {
      Alert.alert('Please enter a valid email address.');
    } else {
      Alert.alert('An unknown error occured.');
    }
  }
};
