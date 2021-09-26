import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { scale, moderateScale } from "../Scaling";

/**
 * This object sets default values to the optional props.
 */
const defaultProps = {
  style: {},
  onPress: () => {},
};

/**
 * @callback onPress
 */

/**
 * @description	General Button component.
 * @constructor
 * @param {Object} props - The props that were defined by the caller of this component.
 * @param {onPress} props.onPress - The size of the spinner.
 */
const Button = ({ onPress, children, style }) => {
  const { buttonStyle, textStyle } = styles;

  return (
    <TouchableOpacity onPress={onPress} style={[buttonStyle, style]}>
      <Text style={textStyle}>{children}</Text>
    </TouchableOpacity>
  );
};

/**
 * Button component StyleSheet.
 */
const styles = {
  textStyle: {
    padding: scale(12),
    color: "#ffffff",
    fontSize: moderateScale(24),
    fontWeight: "normal",
    textAlign: "center",
    textShadowColor: "#000000",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 0,
  },
  buttonStyle: {
    display: 'flex',
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: moderateScale(60),
    alignSelf: "stretch",
    minHeight: moderateScale(32),
    margin: scale(10),
    backgroundColor: "rgba(64, 64, 255, 0.8)",
    borderRadius: 8,
  },
};

// Assign default values to the optional props
Button.defaultProps = defaultProps;

export default Button;
