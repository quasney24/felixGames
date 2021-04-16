import React from 'react';
import { StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';

const RocketAnimation = ({ navigation }) => {
  return (
    <LottieView
      style={styles.container}
      autoPlay
      speed={0.5}
      loop={false}
      onAnimationFinish={() => navigation.navigate('Home')}
      source={require('../../assets/rocket.json')}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#3895D3',
    opacity: 0.8,
  },
});
export default RocketAnimation;
