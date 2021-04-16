import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AppContextProvider } from 'context';

import Home from 'screens/Home';
import Trivia from 'screens/Trivia';
import TriviaQ from 'screens/TriviaQ';
import RocketAnimation from 'components/RocketAnimation';

const Stack = createStackNavigator();

export default function App() {
  return (
    <AppContextProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Felix Games">
          {/* <Stack.Screen 
          name="Welcome" 
          component={RocketAnimation} 
          options={ () => ({
            headerBackTitleVisible: false,
            headerShown: false
          })}
          /> */}
          <Stack.Screen
            options={() => ({
              headerBackTitleVisible: false,
              headerTintColor: 'white',
              headerStyle: {
                backgroundColor: '#29ab87',
                height: 120,
              },
            })}
            name="Felix Games"
            component={Home}
          />
          <Stack.Screen
            name="Trivia"
            component={Trivia}
            options={() => ({
              headerBackTitleVisible: false,
              headerTintColor: 'white',
              headerStyle: {
                backgroundColor: '#29ab87',
                height: 120,
              },
            })}
          />
          <Stack.Screen name="TriviaQ" component={TriviaQ} />
        </Stack.Navigator>
      </NavigationContainer>
    </AppContextProvider>
  );
}
