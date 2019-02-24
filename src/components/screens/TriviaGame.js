import React from 'react';
import {
  ActivityIndicator,
  View,
  Text,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import { connect } from 'react-redux';
import LottieView from 'lottie-react-native';
import * as actions from '../../actions';
import Button from '../Button';
import Question from '../Question';

// Assets
const BACKGROUND_IMAGE = require('../../../assets/images/game_background.png');
const BACKGROUND_IMAGE_ACTIVE = require('../../../assets/images/game_background_active.png');
const LOADING_ANIMATION = require('../../../assets/animations/2151-loading-hamster.json');
const ERROR_ANIMATION = require('../../../assets/animations/4386-connection-error.json');

/**
 * @description	Main Menu screen.
 * @constructor
 */
class TriviaGame extends React.Component {

  /**
	 * Lifecycle event handler called just after the App loads into the DOM.
	 * Call the action to fetch quiz data.
	 */
  componentWillMount() {
    this.props.triviaFetch();
  }

  /**
   * @description Call action to move to the next question or end the game.
   * @param {string} questionOption - The text of the selected question option.
   */
  onPressOption = (questionOption) => {
    this.props.nextQuestion(
      questionOption,
      this.props.currentQuestionIndex,
      this.props.questions,
      this.props.totalScore
    );
  };

  render() {
    const {
      currentQuestionNumber,
      currentQuestion,
      totalQuestionsSize
    } = this.props;

    return (
      <View style={styles.container}>
        <ImageBackground
          style={styles.imageBackground}
          source={(this.props.loading || this.props.error) ? BACKGROUND_IMAGE : BACKGROUND_IMAGE_ACTIVE}
          resizeMode="cover"
        >
          {(this.props.loading || this.props.error) ? (
            (this.props.loading) ? (
              <View style={styles.loaderContainer}>
                <LottieView
                  style={styles.loaderAnimation}
                  source={LOADING_ANIMATION}
                  autoPlay
                  loop
                />
                <Text style={styles.loaderText}>Requesting Questions</Text>
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
                <Button onPress={() => this.props.startGame()}>
                  Try Again
                </Button>
              </View>
            )
          ) : (
            <View style={styles.container}>
              <View style={styles.headerContainer}>
                <Text style={styles.headerTitle}>Question {currentQuestionNumber}/{totalQuestionsSize}</Text>
              </View>
              <Question
                question={currentQuestion.question}
                options={currentQuestion.options}
                type={currentQuestion.type}
                difficulty={currentQuestion.difficulty}
                category={currentQuestion.category}
                onItemSelected={this.onPressOption}
              />
            </View>
          )}          
        </ImageBackground>
      </View>
    );
  }
}

/**
 * TriviaScreen component StyleSheet.
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
    width: 200,
    height: 200
  },
  errorAnimation: {
    width: 100,
    height: 100
  },
  loaderText: {
    fontSize: 30,
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
    color: '#00AA38'
  },
  errorText: {
    fontSize: 30,
    color: '#FF4423',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
    marginBottom: 10,
  },
  errorDescription: {
    fontSize: 20,
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
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: 24,
    paddingLeft: 24,
    paddingTop: 12,
    paddingBottom: 12,
    backgroundColor: '#00BCD4',
    borderWidth: 2,
    borderRadius: 8,
    borderColor: '#ffffff',
    margin: 8,
    marginTop: 36,
  },
  headerTitle: {
    fontWeight: '300',
    color: '#ffffff',
    fontSize: 28,
    fontWeight: '900',
  },
});

const mapStateToProps = ({ trivia }) => {
  const { currentQuestionIndex, error, loading, questions, totalScore } = trivia;

  return {
    currentQuestion: questions[currentQuestionIndex],
    totalQuestionsSize: questions.length,
    currentQuestionNumber: currentQuestionIndex + 1,
    error,
    loading,
    questions,
    currentQuestionIndex,
    totalScore
  };
};

export default connect(mapStateToProps,
  actions
)(TriviaGame);