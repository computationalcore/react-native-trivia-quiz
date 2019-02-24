import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const Button = ({ onPress, children }) => {
  const { buttonStyle, textStyle } = styles;

  return (
    <TouchableOpacity onPress={onPress} style={buttonStyle}>
      <Text style={textStyle}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};

const styles = {
  textStyle: {
    flex: 1,
    padding: 12,
    color: '#ffffff',
    fontSize: 24,
    fontWeight:'normal',
    textAlign: 'center',
    textShadowColor:'#000000',
    textShadowOffset:{width: 2, height: 2},
    textShadowRadius:0,
  },
  buttonStyle: {
    height: 60,
    alignSelf: 'stretch',
    minHeight: 32,
    margin: 10,
    backgroundColor: 'rgba(64, 64, 255, 0.8)',
    borderRadius: 8
  }
};

export default Button;
