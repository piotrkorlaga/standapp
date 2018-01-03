import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';

export const ItemList = ({ prop, pressDelete }) => {
  const {
    containerStyle,
    buttonStyle,
    buttonTextStyle,
    containerTextStyle,
  } = styles;

  return (
    <View style={containerStyle}>
      <TouchableOpacity
        onPress={pressDelete}
        style={buttonStyle}
      >
        <Text style={buttonTextStyle}>-</Text>
      </TouchableOpacity>
      <Text style={containerTextStyle}>{prop}</Text>
    </View>
  );
};

const styles = {
  containerStyle: {
    alignItems: 'center',
    alignContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: 'yellow',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: '#494949',
    position: 'relative',

  },
  buttonStyle: {
    backgroundColor: '#e90a47',
    height: 25,
    width: 25,
    borderRadius: 2,
    marginLeft: 5,
    alignItems: 'center',
    alignContent: 'center',
    marginTop: 5,
    marginBottom: 5,
  },
  buttonTextStyle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#F8F8F8',
  },
  containerTextStyle: {
    fontSize: 18,
    marginLeft: 10,
    color: '#000',
  },
};
