import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import LottieView from 'lottie-react-native';
import Button from './Button';
import { scale, moderateScale, verticalScale} from '../Scaling';

// Assets
const BACKGROUND_IMAGE = require('../../assets/images/game_background.png');
const BACKGROUND_IMAGE_ACTIVE = require('../../assets/images/game_background_active.png');
const LOADING_ANIMATION = require('../../assets/animations/2151-loading-hamster.json');
const ERROR_ANIMATION = require('../../assets/animations/4386-connection-error.json');

/**
 * This object sets default values to the optional props.
 */
const defaultProps = {
  error: false,
  loading: false,
  loadingText: '',
  onRetryPressed: () => {}
};

/**
 * @description	Trivia app general loader container with network error handler.
 * @constructor
 */
class TriviaLoader extends React.Component {

  render() {
    const { loading, error, loadingText, onRetryPressed} = this.props;

    return (
      <View style={styles.container}>
        <ImageBackground
          style={styles.imageBackground}
          source={(loading || error) ? BACKGROUND_IMAGE : BACKGROUND_IMAGE_ACTIVE}
          resizeMode="cover"
        >
          {(loading || error) ? (
            (loading) ? (
              <View style={styles.loaderContainer}>
                <LottieView
                  style={styles.loaderAnimation}
                  source={LOADING_ANIMATION}
                  autoPlay
                  loop
                />
                <Text style={styles.loaderText}>{loadingText}</Text>
              </View>
            ) : (
              <View style={styles.loaderContainer}>
                <LottieView
                    style={styles.errorAnimation}
                    source={ERROR_ANIMATION}
                    autoPlay
                    loop
                />
                <Text style={styles.errorText}>Request Error</Text>
                <Text style={styles.errorDescription}>Unable to get questions from server.</Text>
                <Text style={styles.errorDescription}>Possible reasons:</Text>
                <Text style={[styles.errorDescription, styles.errorIssue]}> - Internet connectivity issue</Text>
                <Text style={[styles.errorDescription, styles.errorIssue]}> - Server Instability</Text>                
                <Button onPress={onRetryPressed}>
                  Try Again
                </Button>
              </View>
            )
          ) : (
            this.props.children
          )}          
        </ImageBackground>
      </View>
    );
  }
}

/**
 * TriviaLoader component StyleSheet.
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 0,
  },
  loaderContainer: {
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
  loaderAnimation: {
    width: moderateScale(200),
    height: verticalScale(200)
  },
  errorAnimation: {
    width: moderateScale(100),
    height: verticalScale(100)
  },
  loaderText: {
    fontSize: moderateScale(30),
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
    color: '#00AA38'
  },
  errorText: {
    fontSize: moderateScale(30),
    color: '#FF4423',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
    marginBottom: scale(10),
  },
  errorDescription: {
    fontSize: moderateScale(20),
    textAlign: 'center',
    marginBottom: 0,
  },
  errorIssue: {
    marginBottom: 0,
    fontStyle: 'italic',
  },
  imageBackground: {
    flex: 1,
    height: '100%',
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
});

// Assign default values to the optional props
TriviaLoader.defaultProps = defaultProps;

export default TriviaLoader;