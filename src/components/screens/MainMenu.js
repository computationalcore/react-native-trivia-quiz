import React from 'react';
import {
  ImageBackground,
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
} from 'react-native';
import { connect } from 'react-redux';
import { Font } from 'expo';
import Button from '../Button';
import { startGame } from '../../actions';

// Game background image
const BACKGROUND_IMAGE = require('../../../assets/images/game_background.png');
const GAME_TITLE_FONT = require('../../../assets/fonts/SaucerBB.ttf');

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
          <Button style={styles.startButton} onPress={() => this.props.startGame()}>
            Start Quiz
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
    marginTop: 60,
    alignSelf: 'center',
    justifyContent: 'flex-start',
  },
  gameTitle: {
    fontFamily: "game-title",
    color: '#000000',
    fontSize: 60
  },
  startButton: {
    marginBottom: 30
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

export default connect(mapStateToProps, { startGame })(MainMenu);