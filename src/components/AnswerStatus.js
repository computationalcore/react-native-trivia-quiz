import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import * as Font from 'expo-font';
import LottieView from 'lottie-react-native';
import { scale, moderateScale, verticalScale} from '../Scaling';

const STATUS_FONT = require('../../assets/fonts/BadaboomBB_Reg.ttf');
const CORRECT_ANIMATION = require('../../assets/animations/433-checked-done.json');
const INCORRECT_ANIMATION = require('../../assets/animations/101-x-pop.json');
const TIMEOUT_ANIMATION = require('../../assets/animations/4284-notification.json');


/**
 * This object is used for type checking the props of the component.
 */
const propTypes = {
  type: PropTypes.oneOf(['correct', 'incorrect', 'timeout']).isRequired,
};


/**
 * @description	Show the correct animation for answer status based on type.
 * @constructor
 * @param {Object} props - The props that were defined by the caller of this component.
 * @param {string} props.type - Type of the status answer (correct, incorrect or timeout).
*/
class AnswerStatus extends React.Component {

  constructor(props){
		super(props);
		/**
		 * @typedef {Object} ComponentState
		 * @property {Object[]} fontLoaded - Indicates whether custom fonts already loaded.
		 */

		/** @type {ComponentState} */
		this.state = {
			fontLoaded: false
		};
  }

  async componentDidMount() {
    await Font.loadAsync({
      'status-text': STATUS_FONT,
    });
    this.setState({ fontLoaded: true });
  }

  render() {
    let animation;
    let statusMessage;
    let statusStyle;
    switch(this.props.type) {
      case 'correct':
        animation = CORRECT_ANIMATION;
        statusMessage = 'Correct!!!';
        statusStyle = styles.correctText;
        break;
      case 'incorrect':
        animation = INCORRECT_ANIMATION;
        statusMessage = 'Incorrect!!!';
        statusStyle = styles.errorText;
        break;
      default:
        statusMessage = 'Time over!!!';
        statusStyle = styles.timeoutText;
        animation = TIMEOUT_ANIMATION;
    }

    return (
      (this.state.fontLoaded) &&
      <View style={styles.statusContainer}>
        <LottieView
            style={styles.statusAnimation}
            source={animation}
            autoPlay={true}
            loop={false}
        />
        <Text style={[styles.statusText, statusStyle]}>{statusMessage}</Text>
      </View>
    );
  }  
}

/**
 * AnswerStatus component StyleSheet.
 */
const styles = StyleSheet.create({
  statusContainer: {
    flex: 1,
    height: '100%',
    width: '100%',
    paddingTop: 0,
    borderWidth: 2,
    borderRadius: 8,
    borderColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
  statusAnimation: {
    width: scale(300),
    height: scale(300)
  },
  statusText: {
    fontFamily: "status-text",
    fontSize: moderateScale(40),
    textShadowRadius: 10,
    marginTop: moderateScale(-60)
  },
  correctText: {
    color: '#00C871'
  },
  errorText: {
    color: '#FF1122'
  },
  timeoutText: {
    color: '#FFAA38'
  },
});

// Type checking the props of the component
AnswerStatus.propTypes = propTypes;

export default AnswerStatus;