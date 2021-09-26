import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';
import { Audio } from 'expo-av';
import CountdownCircle from '../CountdownCircle';
import AnswerStatus from '../AnswerStatus';
import Button from '../Button';
import Question from '../Question';
import TriviaLoader from '../TriviaLoader';
import * as actions from '../../actions';
import { capitalizeFirstLetter } from '../../Utils';
import { scale, moderateScale } from '../../Scaling';

// Sound setup
const AVAILABLE_SOUNDS = {
  correct: require('../../../assets/sounds/correct.wav'),
  incorrect: require('../../../assets/sounds/incorrect.wav'),
  timeout: require('../../../assets/sounds/timeout.wav')
};

const COUNTDOWN_TIME = 10;

/**
 * @description	Trivia Game Screen.
 * @constructor
 */
class TriviaGame extends React.Component {

  constructor(props){
		super(props);
		/**
		 * @typedef {Object} ComponentState
		 * @property {Object[]} fontLoaded - Indicates whether custom fonts already loaded.
		 */

		/** @type {ComponentState} */
		this.state = {
      answerStatus: false,
      answerType: 'correct',
      fontLoaded: false,
      countdownTime: COUNTDOWN_TIME,
      soundController: null,
		};
  }

  async componentDidMount() {
    // Call the action to fetch quiz data.
    const { selectedCategoryId, selectedDifficulty, numberOfQuestions } = this.props;
    this.props.triviaFetch(
      selectedCategoryId, 
      selectedDifficulty, 
      numberOfQuestions,
    );

    // Preload sound controller
    await Audio.setIsEnabledAsync(true);
    this.setState({
      soundController: new Audio.Sound()
    });
  }

  /**
   * Play the correct sound based on answer status type.
   */
  playSound = async (type) => {
    try {
      await this.state.soundController.unloadAsync();
      await this.state.soundController.loadAsync(AVAILABLE_SOUNDS[type]);
      await this.state.soundController.playAsync();
    } catch (error) {
      // An error occurred!
      console.log(error);
    }
  };

  /**
   * @description Call action to move to the next question or end the game.
   * @param {string} questionOption - The text of the selected question option.
   */
  handleAnswerSelection = (questionOption) => {
    // Ignore if already selected (it can be a timeout)
    if(this.state.answerStatus) return;
    const {
      currentQuestionIndex,
      currentQuestion,
      questions,
      nextQuestion,
      totalScore
    } = this.props;
    // TODO: Lottie  will release a onAnimationFinish event handler, replace later
    const app = this;
    const type = (questionOption === null) ? 'timeout': (questionOption === currentQuestion.correct_answer) ? 'correct' : 'incorrect';
    this.playSound(type);
    //console.log('---');
    //console.log(currentQuestion.correct_answer);
    //console.log(questionOption);
    this.setState({answerStatus: true, answerType: type});
    setTimeout(function(){ 
      app.setState({answerStatus: false, countdownTime: COUNTDOWN_TIME});
      nextQuestion(
        questionOption,
        currentQuestionIndex,
        questions,
        totalScore
      );
    }, 
    1500);
  };

  render() {
    const {
      currentQuestionNumber,
      currentQuestion,
      questions,
      totalQuestionsSize,
    } = this.props;

    return (
      <TriviaLoader
          loading={this.props.loading}
          error={this.props.error}
          loadingText="Requesting Questions"
          onRetryPressed={() => this.props.startGame()}
        >
        {(this.state.answerStatus) &&
        <View style={styles.answerStatus}>
          <AnswerStatus
            type={this.state.answerType}
          />
        </View>
        }
        {(questions.length === 0) ? (
          <View style={styles.noDataContainer}>
            <View style={styles.headerContainer}>
              <Text style={styles.headerTitle}>No Quiz Available</Text>
            </View>
            <Text style={styles.noDataText}>No Quiz questions available for "{this.props.selectedCategory}" category,
            "{this.props.selectedDifficulty}" difficulty, and {this.props.numberOfQuestions} questions.</Text>
            <Text style={styles.noDataText}>NOTE: Sometimes lowering the number of questions for the same category and difficulty works.</Text>
            <Button onPress={this.props.startGameSelection}>
              Try Again with new Options
            </Button>
          </View>
        ) : (
          <View style={styles.container}>
            <View style={styles.headerContainer}>
              <Text style={styles.headerTitle}>Question {currentQuestionNumber}/{totalQuestionsSize}</Text>
              <Text style={styles.categoryText}>{this.props.selectedCategory} - {capitalizeFirstLetter(currentQuestion.difficulty)}</Text>
            </View>
            <Question
              question={currentQuestion.question}
              options={currentQuestion.options}
              type={currentQuestion.type}
              difficulty={currentQuestion.difficulty}
              category={currentQuestion.category}
              onItemSelected={this.handleAnswerSelection}
            />
            {(!this.state.answerStatus) &&
            <View style={styles.countdownContainer}>
            <CountdownCircle
                seconds={this.state.countdownTime}
                radius={scale(40)}
                style={styles.itemStyle}
                borderWidth={scale(10)}
                color="#ff003f"
                bgColor="#ffffff"
                textStyle={{ fontSize: moderateScale(20) }}
                onTimeElapsed={() => this.handleAnswerSelection(null)}
            /></View>}
          </View>
        )}
        </TriviaLoader>
    );
  }
}

/**
 * TriviaScreen component StyleSheet.
 */
const styles = StyleSheet.create({
  countdownContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    alignSelf: 'center'
  },
  noDataContainer: {
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
  answerStatus: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 9999
  },
  noDataText: {
    fontSize: moderateScale(20),
    padding: scale(10),
    textAlign: 'justify',
  },
  container: {
    flex: 1,
    paddingTop: 0,
  },
  headerContainer: {
    //flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: scale(24),
    paddingLeft: scale(24),
    paddingTop: scale(12),
    paddingBottom: scale(12),
    backgroundColor: '#00BCD4',
    borderWidth: 2,
    borderRadius: 8,
    borderColor: '#ffffff',
    margin: scale(8),
    marginTop: scale(36),
  },
  headerTitle: {
    fontWeight: '300',
    color: '#ffffff',
    fontSize: moderateScale(28),
    fontWeight: '900',
  },
  categoryText: {
    fontWeight: '300',
    color: '#ffffff',
    fontSize: moderateScale(18),
    fontWeight: '900',
  },
});

const mapStateToProps = ({ trivia }) => {
  const { 
    categories,
    currentQuestionIndex,
    error,
    loading,
    questions,
    totalScore,
    selectedCategoryId,
    selectedDifficulty,
    numberOfQuestions
  } = trivia;

  return {
    currentQuestion: questions[currentQuestionIndex],
    currentQuestionNumber: currentQuestionIndex + 1,
    selectedCategory: categories.filter(category => category.value === selectedCategoryId)[0].label,
    totalQuestionsSize: questions.length,
    currentQuestionIndex,
    error,
    loading,
    numberOfQuestions,
    questions,
    totalScore,
    selectedCategoryId,
    selectedDifficulty,
  };
};

export default connect(mapStateToProps,
  actions
)(TriviaGame);