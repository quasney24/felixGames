import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import * as firebase from 'firebase';
import apiKeys from './config/keys';

import MainTabs from 'MainTabs';
import AuthProvider from 'components/AuthProvider';
import { store } from 'store/configureReducer';

export default function App() {
  if (!firebase.apps.length) {
    console.log('Connected with Firebase');
    firebase.initializeApp(apiKeys.firebaseConfig);
  }

  return (
    <Provider store={store}>
      <AuthProvider>
        <NavigationContainer>
          <MainTabs />
        </NavigationContainer>
      </AuthProvider>
    </Provider>
  );
}
