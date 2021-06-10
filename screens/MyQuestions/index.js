import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';

import colors from 'consts/colors';

const initialLayout = { width: Dimensions.get('window').width };

const FirstRoute = () => (
  <View style={{ flex: 1, backgroundColor: '#ff4081' }} />
);

const SecondRoute = () => (
  <View style={{ flex: 1, backgroundColor: '#673ab7' }} />
);

const MyQuestions = ({ navigation }) => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'pending', title: 'Pending' },
    { key: 'accepted', title: 'Accepted' },
    { key: 'declined', title: 'Declined' },
  ]);

  const renderScene = SceneMap({
    pending: FirstRoute,
    accepted: SecondRoute,
    declined: FirstRoute,
  });

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      style={styles.tabBarStyle}
      indicatorStyle={styles.indicatorStyle}
      labelStyle={styles.labelStyle}
    />
  );

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={initialLayout}
      renderTabBar={renderTabBar}
    />
  );
};

const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
  tabBarStyle: {
    backgroundColor: colors.primaryColor,
  },
  indicatorStyle: {
    backgroundColor: 'white',
  },
  labelStyle: {
    textTransform: 'capitalize',
  },
});

export default MyQuestions;
