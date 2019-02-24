import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import Question from '../Question';

// Game background image
const BACKGROUND_IMAGE = require('../../../assets/images/game_background_active.png');

/**
 * @description	Main Menu screen.
 * @constructor
 * @param {Object} props - The props that were defined by the caller of this component.
 * @param {function} props.currentQuestionIndex - Callback when user clicks start game button.
 * @param {function} props.questions - Callback when user clicks start game button.
 * @param {function} props.totalScore - Callback when user clicks start game button.
 * @param {function} props.currentQuestionIndex - Callback when user clicks start game button.
 * @param {function} props.currentQuestionIndex - Callback when user clicks start game button.
 * @param {function} props.currentQuestionIndex - Callback when user clicks start game button.
 */
class TriviaGame extends React.Component {

  componentWillMount() {
    this.getQuestions()
  }

  getQuestions = () => {
    this.props.triviaFetch();
  }

  _onPressOption = (questionOption) => {
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
          source={BACKGROUND_IMAGE}
          resizeMode="cover"
        >
          {(!this.props.loading) &&
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
                onItemSelected={this._onPressOption}
              />
            </View>
          }
          
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
    paddingTop: 0,
    borderWidth: 2,
    borderRadius: 8,
    borderColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
  loaderText: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 20,
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