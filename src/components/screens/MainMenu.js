import React from 'react';
import {
  ImageBackground,
  Linking,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import * as Font from 'expo-font';
import Button from '../Button';
import { startGameSelection } from '../../actions';
import { scale, moderateScale, verticalScale} from '../../Scaling';

// Game background image
const BACKGROUND_IMAGE = require('../../../assets/images/game_background.png');
const GAME_TITLE_FONT = require('../../../assets/fonts/SaucerBB.ttf');

const GITHUB_URL = 'https://github.com/computationalcore/react-native-trivia-quiz';

/**
 * @description	Main Menu screen.
 * @constructor
 * @param {Object} props - The props that were defined by the caller of this component.
 * @param {function} props.startGame - Callback when user clicks start game button.
 */
class MainMenu extends React.Component {

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
      'game-title': GAME_TITLE_FONT,
    });
    this.setState({ fontLoaded: true });
  }

  /**
   * Open githubpage using default browser.
   */
  handleGithubClick = () => {
    Linking.canOpenURL(GITHUB_URL).then(supported => {
      if (supported) {
        Linking.openURL(GITHUB_URL);
      } else {
        console.log("Don't know how to open URI: " + GITHUB_URL);
      }
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
            style={styles.imageBackground}
            source={BACKGROUND_IMAGE}
            resizeMode="cover"
          >
          {(this.state.fontLoaded) &&
          <View style={styles.gameTitleContainer}>
            <Text style={styles.gameTitle}> TRIVIA QUIZ </Text>
          </View>
          }
          <Button style={styles.playButton} onPress={this.props.startGameSelection}>
            Play
          </Button>
          <Button style={styles.githubButton} onPress={this.handleGithubClick}>
            Open Github Page
          </Button>
        </ImageBackground>
      </View>
    )
  }
}

/**
 * MainMenu component StyleSheet.
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  gameTitleContainer: {
    flex: 1,
    marginTop: scale(60),
    alignSelf: 'center',
    justifyContent: 'flex-start',
  },
  gameTitle: {
    fontFamily: "game-title",
    color: '#000000',
    fontSize: moderateScale(50)
  },
  playButton: {
    marginBottom: scale(10)
  },
  githubButton: {
    marginBottom: scale(50),
    backgroundColor: '#DC143C'
  },
  imageBackground: {
    flex: 1,
    height: '100%',
    width: '100%',
    justifyContent: 'flex-end',
  },
});

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps, { startGameSelection })(MainMenu);