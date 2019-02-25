import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import { connect } from 'react-redux';
import { Audio, Font } from 'expo';
import LottieView from 'lottie-react-native';
import Button from '../Button';
import { goToMainMenu, startGameSelection } from '../../actions';


// Static assets
const GOOD_ANIMATION = require('../../../assets/animations/677-trophy.json');
const AVERAGE_ANIMATION = require('../../../assets/animations/2144-little-girl-jumping-loader.json');
const BAD_ANIMATION = require('../../../assets/animations/823-crying.json');
const GOOD_SOUND = require('../../../assets/sounds/gameover_good.wav');
const AVERAGE_SOUND = require('../../../assets/sounds/gameover_average.wav');
const BAD_SOUND = require('../../../assets/sounds/gameover_bad.wav');
const BACKGROUND_IMAGE = require('../../../assets/images/game_background.png');
const GAMEOVER_TITLE_FONT = require('../../../assets/fonts/GrinchedRegular.otf');
const GAMEOVER_FONT = require('../../../assets/fonts/BadaboomBB_Reg.ttf');

/**
 * @description	Game Over screen.
 * @constructor
 * @param {Object} props - The props that were defined by the caller of this component.
 * @param {number} props.elapsedTime - Total elapsed time in seconds since start and game over.
 * @param {function} props.goToMainMenu - Callback executed when user clicks back to main menu.
 * @param {string} props.scorePercent - Percent value of the score.
 * @param {string} props.selectedCategory - Quiz category.
 * @param {string} props.selectedDifficulty - Quiz difficulty.
 * @param {function} props.startGameSelection - Callback executed when user clicks play again button.
 * @param {number} props.totalQuestionsNumber - Quiz Total questions number.
 * @param {number} props.totalScore - Game total score.
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

  /**
   * Load custom fonts when component mount.
   */
  async componentDidMount() {
    const { scorePercent } = this.props;
    await Font.loadAsync({
      'game-over': GAMEOVER_FONT,
      'game-over-title': GAMEOVER_TITLE_FONT,
    });
    this.setState({ fontLoaded: true });

    await Audio.setIsEnabledAsync(true);
    const soundObject = new Audio.Sound();
    try {
      await soundObject.loadAsync((scorePercent >= 0.8) ? GOOD_SOUND: (scorePercent > 0.5) ? AVERAGE_SOUND: BAD_SOUND);
      await soundObject.playAsync();
    } catch (error) {
      // An error occurred!
      console.log(error);
    }
  }

  render() {

    const { 
      elapsedTime,
      goToMainMenu,
      scorePercent,
      selectedCategory,
      selectedDifficulty,
      startGameSelection,
      totalQuestionsNumber,
      totalScore,
    } = this.props;

    // Change some game over data based on score percent
    let scoreColor;
    let message;
    let animation;
    if(scorePercent >= 0.8) {
      animation = GOOD_ANIMATION;
      scoreColor = '#14AB00';
      message = 'Congratulations, you rock!';
    }
    else if(scorePercent > 0.5) {
      animation = AVERAGE_ANIMATION;
      scoreColor = '#8f61f9';
      message = 'Not bad!\nBut you can do better!';
    }
    else {
      animation = BAD_ANIMATION;
      message = 'Better luck next time!'
      scoreColor = '#FF2020';
    }

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
              <LottieView
                style={styles.statusAnimation}
                source={animation}
                autoPlay
                loop
              />
              <Text style={[styles.gameOverMessage, { color: scoreColor }]}>{message}</Text>
              <Text style={[styles.gameScoreText, { color: scoreColor }]}>Total Score: {totalScore} of {totalQuestionsNumber}</Text>
              <Text style={styles.gameStatusText}>Elapsed Time: {elapsedTime} seconds</Text>
              <Text style={styles.gameStatusText}>Category: {selectedCategory}</Text>
              <Text style={styles.gameStatusText}>Difficulty: {selectedDifficulty}</Text>
              <Button onPress={startGameSelection}>
                Play Again
              </Button>
              <Button style={styles.mainMenuButton} onPress={goToMainMenu}>
                Back to Main Menu
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
  gameOverMessage: {
    fontSize: 28,
    textAlign: 'center',
    fontWeight: "900"
  },
  gameOverTitle: {
    fontFamily: "game-over-title",
    color: '#000000',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
    fontSize: 78,
    marginBottom: -40,
    zIndex: 9999
  },
  gameScoreText: {
    fontFamily: 'game-over',
    fontWeight: "900",
    fontSize: 32,
    marginTop: 5,
    marginBottom: 5,
  },
  gameStatusText: {
    fontFamily: 'game-over',
    fontSize: 24,
    fontWeight: "900",
    color: '#8f61f9',
    marginTop: 2,
    marginBottom: 2,
  },
  mainMenuButton: {
    marginBottom: 50,
    backgroundColor: '#DC143C'
  },
  statusAnimation: {
    width: 200,
    height: 200
  },
});

const mapStateToProps = ({ trivia }) => {
  const { categories, endTime, questions, startTime, selectedCategoryId, selectedDifficulty, totalScore } = trivia;

  // Elapsed time in seconds
  const elapsedTime = Math.round((endTime - startTime) / 1000);

  const totalQuestionsNumber = questions.length;

  const scorePercent = totalScore / totalQuestionsNumber;

  return {
    selectedCategory: categories.filter(category => category.value === selectedCategoryId)[0].label,
    elapsedTime,
    scorePercent,
    selectedDifficulty,
    totalQuestionsNumber,
    totalScore
  };
};

export default connect(mapStateToProps, { startGameSelection, goToMainMenu })(GameOver);