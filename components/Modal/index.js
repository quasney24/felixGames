import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { Button, Overlay } from 'react-native-elements';

const Modal = () => {
  const [visible, setVisible] = useState(true);

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  return (
    <View>
      <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
        <Text>Hello from Overlay!</Text>
        <Button title="Open Overlay" onPress={toggleOverlay} />
      </Overlay>
    </View>
  );
};

export default Modal;
