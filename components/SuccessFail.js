import React from 'react';
import LottieView from 'lottie-react-native';

 const SuccessFail = ({result, next}) => {

  return (
      <>
        {result === 'success' ?
        <LottieView onAnimationFinish={() => next()} autoPlay speed={0.8} source={require('../assets/correct-animation.json')} loop={false}  />
        : <LottieView onAnimationFinish={() => next()} autoPlay speed={0.8} source={require('../assets/wrong-answer.json')} loop={false}/>
        }
        </>
    )
}

export default SuccessFail