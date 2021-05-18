import React from 'react';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import { Text, Button, Overlay, Input } from 'react-native-elements';
import colors from 'consts/colors';

export default function Modal({
  width,
  height,
  visible,
  modalText,
  button,
  button2,
}) {
  return (
    <Overlay
      isVisible={visible}
      overlayStyle={{ ...styles.buttonContainer, width, height }}>
      <View style={styles.container}>
        <Text style={styles.modalText}>{modalText}</Text>
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <Button
              title={button.title}
              buttonStyle={button.style}
              onPress={button.action}
            />
          </View>
          {button2 ? (
            <View style={styles.button}>
              <Button
                title={button2.title}
                buttonStyle={button2.style}
                onPress={button2.action}
              />
            </View>
          ) : null}
        </View>
      </View>
    </Overlay>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    width: '90%',
  },
  inputScrolViewContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  modalText: {
    textAlign: 'center',
    color: 'black',
    fontSize: 16,
    padding: 16,
  },
  inputLabelText: {
    fontSize: 16,
    color: colors.primaryColor,
  },
  buttonContainer: {
    width: '100%',
    paddingVertical: '6%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  button: {
    width: '40%',
    padding: '2%',
  },
});
