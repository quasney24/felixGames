import React from 'react';
import LottieView from 'lottie-react-native';
import assets from 'consts/assets';

const SuccessFail = ({ result, next }) => {
  return (
    <>
      {result === 'success' ? (
        <LottieView
          onAnimationFinish={() => next()}
          autoPlay
          speed={0.8}
          source={assets.CorrectAnimation}
          loop={false}
        />
      ) : (
        <LottieView
          onAnimationFinish={() => next()}
          autoPlay
          speed={0.8}
          source={assets.WrongAnimation}
          loop={false}
        />
      )}
    </>
  );
};

export default SuccessFail;
