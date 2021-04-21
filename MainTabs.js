import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import HomeStack from 'stacks/HomeStack';
import ProfileStack from 'stacks/ProfileStack';
import colors from 'consts/colors';
import { HOME_TAB, PROFILE_TAB } from 'stacks/routes';

const Tabs = createBottomTabNavigator();

export default function MainTabs() {
  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          switch (route.name) {
            case HOME_TAB:
              return (
                <MaterialCommunityIcons name="home" size={size} color={color} />
              );
            case PROFILE_TAB:
              return (
                <MaterialCommunityIcons name="face" size={size} color={color} />
              );
            default:
              return (
                <MaterialCommunityIcons name="face" size={size} color={color} />
              );
          }
        },
      })}
      initialRouteName={HOME_TAB}
      tabBarOptions={{
        activeTintColor: colors.white,
        inactiveTintColor: colors.black,
        inactiveBackgroundColor: colors.primaryColor,
        activeBackgroundColor: colors.primaryColor,
        style: {
          backgroundColor: colors.primaryBackground,
          borderTopColor: colors.white,
        },
      }}>
      <Tabs.Screen name={HOME_TAB} component={HomeStack} />
      <Tabs.Screen name={PROFILE_TAB} component={ProfileStack} />
    </Tabs.Navigator>
  );
}
