import React, { createContext, useState } from 'react';
import { Alert } from 'react-native';
import Axios from 'axios';
import * as firebase from 'firebase';
import 'firebase/firestore';

export const AppContext = createContext();

export const AppContextProvider = (props) => {
  console.log('hello from appContext');

  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});
  const [categoryData, setCategoryData] = useState([]);
  const [triviaData, setTriviaData] = useState([]);
  const [id, setId] = useState();
  const [difficulty, setDifficulty] = useState();

  const loginUser = async (email, password) => {
    if (!email) {
      Alert.alert('Please enter a email address.');
      return;
    }
    if (!password) {
      Alert.alert('Please enter a password.');
      return;
    }
    setLoading(true);
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
    setLoading(false);
  };

  const logoutUser = async () => {
    setLoading(true);
    try {
      await firebase.auth().signOut();
    } catch (err) {
      Alert.alert('Trouble logging out.');
    }
    setLoading(false);
  };

  const resetPassword = async (email) => {
    if (!email) {
      return Alert.alert(
        'Please enter a email address and click this button again.',
      );
    }
    setLoading(true);
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
    setLoading(false);
  };

  const getAllCategoryData = async () => {
    Axios.get('https://opentdb.com/api_category.php').then(async (response) => {
      const transformedCatagories = [];
      response.data.trivia_categories.forEach((cat) => {
        cat.name = cat.name.replace('Entertainment: ', '');
        cat.name = cat.name.replace('Science: ', '');
        transformedCatagories.push(cat);
      });
      setCategoryData(transformedCatagories);
    });
  };

  const getTriviaData = async (id, difficulty) => {
    Axios.get(
      `https://opentdb.com/api.php?amount=1&encode=base64&category=${id}&difficulty=${difficulty}`,
    ).then((res) => {
      console.log('from Context', res);
      setId(id);
      setDifficulty(difficulty);
      setTriviaData(res.data.results);
    });
  };

  return (
    <AppContext.Provider
      value={{
        loading,
        user,
        setUser,
        loginUser,
        logoutUser,
        resetPassword,
        getAllCategoryData,
        categoryData,
        getTriviaData,
        triviaData,
        id,
        difficulty,
      }}>
      {props.children}
    </AppContext.Provider>
  );
};
