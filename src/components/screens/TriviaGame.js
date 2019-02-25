import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';
import Button from '../Button';
import Question from '../Question';
import TriviaLoader from '../TriviaLoader';
import * as actions from '../../actions';
import { capitalizeFirstLetter } from '../../Utils';

/**
 * @description	Trivia Game Screen.
 * @constructor
 */
class TriviaGame extends React.Component {

  /**
	 * Lifecycle event handler called just after the App loads into the DOM.
	 * Call the action to fetch quiz data.
	 */
  componentWillMount() {
    const { selectedCategoryId, selectedDifficulty, numberOfQuestions } = this.props;
    this.props.triviaFetch(
      selectedCategoryId, 
      selectedDifficulty, 
      numberOfQuestions
    );
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
      <TriviaLoader
          loading={this.props.loading}
          error={this.props.error}
          loadingText="Requesting Questions"
          onRetryPressed={() => this.props.startGame()}
        >
        {(false) ? (
          <View style={styles.noDataContainer}>
            <View style={styles.headerContainer}>
              <Text style={styles.headerTitle}>No Quiz Available</Text>
            </View>
            <Text style={styles.noDataText}>No Quiz questions available for {this.props.selectedCategory} category,
            {this.props.selectedDifficulty} difficulty, and {this.props.numberOfQuestions} questions.</Text>
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
              onItemSelected={this.onPressOption}
            />
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
  noDataText: {
    fontSize: 20,
    padding: 10,
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
  categoryText: {
    fontWeight: '300',
    color: '#ffffff',
    fontSize: 18,
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