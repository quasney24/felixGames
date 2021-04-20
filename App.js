import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AppContextProvider } from 'context';

import HomeStack from 'stacks/HomeStack';

export default function App() {
  return (
    <AppContextProvider>
      <NavigationContainer>
        <HomeStack />
      </NavigationContainer>
    </AppContextProvider>
  );
}
