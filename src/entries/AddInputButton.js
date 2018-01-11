import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

export const AddInputButton = ({ onPress, children }) => (
  <TouchableOpacity
    style={styles.buttonStyle}
    onPress={onPress}
  >
    <Text style={styles.buttonTextStyle}>{children}</Text>
  </TouchableOpacity>
);

const styles = {
  buttonStyle: {
    height: 70,
    width: 70,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    backgroundColor: '#e90a47',
    borderWidth: 1,
    borderRadius: 50,
    borderColor: '#F8F8F8',
    marginRight: 10,
    marginBottom: 10,
    marginTop: 10,
  },
  buttonTextStyle: {
    fontSize: 44,
    fontWeight: '300',
    color: '#F8F8F8',
  },
};
