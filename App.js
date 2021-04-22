import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AppContextProvider } from 'context';
import * as firebase from 'firebase';
import apiKeys from './config/keys';

import MainTabs from 'MainTabs';
import AuthProvider from 'components/AuthProvider';

export default function App() {
  if (!firebase.apps.length) {
    console.log('Connected with Firebase');
    firebase.initializeApp(apiKeys.firebaseConfig);
  }

  return (
    <AppContextProvider>
      <NavigationContainer>
        <AuthProvider>
          <MainTabs />
        </AuthProvider>
      </NavigationContainer>
    </AppContextProvider>
  );
}
