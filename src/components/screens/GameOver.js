import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableHighlight
} from 'react-native';
import { connect } from 'react-redux';
import { Font } from 'expo';
import { startGame } from '../../actions';
import Button from '../Button';


// Game background image
const BACKGROUND_IMAGE = require('../../../assets/images/game_background.png');
const GAMEOVER_TITLE_FONT = require('../../../assets/fonts/GrinchedRegular.otf');
const GAMEOVER_FONT = require('../../../assets/fonts/BadaboomBB_Reg.ttf');

/**
 * @description	Game Over screen.
 * @constructor
 * @param {Object} props - The props that were defined by the caller of this component.
 * @param {function} props.startGame - Callback executed when user clicks play again button.
 */
class GameOver extends React.Component {
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
      'game-over': GAMEOVER_FONT,
      'game-over-title': GAMEOVER_TITLE_FONT,
    });
    this.setState({ fontLoaded: true });
  }

  render() {

    const { elapsedTime, totalQuestionsNumber, totalScore } = this.props;
    // Change score color based on value
    const scorePercent = totalScore / totalQuestionsNumber;
    const scoreColor = (scorePercent >= 0.8) ? '#14AB00': (scorePercent >= 0.5) ? '#D9E100' : '#FF2020';
    return (
      <View style={styles.container}>
        <ImageBackground
            style={styles.imageBackground}
            source={BACKGROUND_IMAGE}
            resizeMode="cover"
          >
          {(this.state.fontLoaded) &&
            <View style={styles.gameOverData}>
              <Text style={styles.gameOverTitle}>GAME OVER</Text>
              <Text style={[styles.gameScoreText, { color: scoreColor }]}
              >Total Score: {totalScore} of {totalQuestionsNumber}</Text>
              <Text style={styles.gameTimeText}>Elapsed Time: {elapsedTime} seconds</Text>
              <Button onPress={() => this.props.startGame()}>
                Play Again
              </Button>
            </View>
          }
        </ImageBackground>
      </View>
    )
  }
}

/**
 * GameOver component StyleSheet.
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    alignItems: 'center',
    backgroundColor: 'rgba(64, 64, 64,0.8)',
    borderRadius: 8,
    padding: 10,
    margin: 20
  },
  imageBackground: {
    flex: 1,
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  gameOverData: {
    padding: 16,
    marginTop: 32,
    marginBottom: 32,
    alignSelf: 'stretch',
    alignItems: 'center',
    borderWidth: 2,
    borderRadius: 8,
    borderColor: '#ffffff',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
  gameOverTitle: {
    fontFamily: "game-over-title",
    color: '#000000',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
    fontSize: 78
  },
  gameScoreText: {
    fontFamily: 'game-over',
    textShadowColor: 'black',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
    fontSize: 36,
    marginTop: 10,
    marginBottom: 10,
  },
  gameTimeText: {
    fontFamily: 'game-over',
    fontSize: 36,
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
    color: '#8f61f9',
    marginTop: 10,
    marginBottom: 10,
  },
});

const mapStateToProps = ({ trivia }) => {
  const { totalScore, startTime, endTime, questions } = trivia;

  // Elapsed time in seconds
  const elapsedTime = Math.round((endTime - startTime) / 1000);

  const totalQuestionsNumber = questions.length;

  return { elapsedTime, totalQuestionsNumber, totalScore };
};

export default connect(mapStateToProps, { startGame })(GameOver);