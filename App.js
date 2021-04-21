import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AppContextProvider } from 'context';

import MainTabs from 'MainTabs';

export default function App() {
  return (
    <AppContextProvider>
      <NavigationContainer>
        <MainTabs />
      </NavigationContainer>
    </AppContextProvider>
  );
}
