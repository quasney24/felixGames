import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button, Overlay } from 'react-native-elements';
import colors from 'consts/colors';
import { HOME_SCREEN } from 'screens/routes';

const Modal = ({ text, buttonText, next, counter, nav }) => {
  const [visible, setVisible] = useState(true);

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  return (
    <View>
      <Overlay
        overlayStyle={styles.modal}
        isVisible={visible}
        onBackdropPress={() => {
          toggleOverlay();
          next();
        }}>
        <Text style={styles.header}>{text}</Text>
        <Button
          buttonStyle={styles.button}
          title={buttonText}
          onPress={() => {
            counter > 9 ? nav.navigate(HOME_SCREEN) : toggleOverlay();
            next();
          }}
        />
      </Overlay>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    textAlign: 'center',
    fontSize: 30,
    padding: '2%',
  },
  button: {
    backgroundColor: colors.primaryColor,
  },
  modal: {
    opacity: 0.95,
    width: '90%',
    marginBottom: '100%',
  },
});

export default Modal;
