import { Actions } from 'react-native-router-flux';
import { AllHtmlEntities as entities } from 'html-entities';
import {
  TRIVIA_START_GAME,
  TRIVIA_FETCH_SUCCESS,
  TRIVIA_FETCH_ERROR,
  TRIVIA_NEXT_QUESTION,
  TRIVIA_GAME_OVER
} from './types';
import { shuffleArray } from '../Utils';
import * as TriviaAPI from '../TriviaAPI';

/**
 * @description Fetch the questions, parse the response and dispatch success or error action.
 */
export const triviaFetch = () => {
  
  return (dispatch) => {
    TriviaAPI.getQuestions().then((questions) => {
      const formatedQuestions = questions.map(
        question => {
          let options = question.incorrect_answers;
          options.push(question.correct_answer);
          options = shuffleArray(options);

          return {
            options: options.map(option => entities.decode(option)),
            category: question.category,
            difficulty: question.difficulty,
            type: question.type,
            correct_answer: question.correct_answer,
            question: entities.decode(question.question)
          }
        }
      );
      console.log(formatedQuestions);
      dispatch({ type: TRIVIA_FETCH_SUCCESS, payload: formatedQuestions });
    }).catch(function () {
      dispatch({ type: TRIVIA_FETCH_ERROR });
    });
  }
};

/**
 * @description Validate answer, and dispatch action to move to next question or game over.
 * @param {string} currentAnswer - Currect answer selected by the user.
 * @param {number} currentQuestionIndex - Current question selected by the user.
 * @param {Object[]} questions - The array with the questions.
 * @param {*} totalScore - The total score of the user.
 */
export const nextQuestion = (currentAnswer, currentQuestionIndex, questions, totalScore) => {

  return (dispatch) => {
    const nextIndex = currentQuestionIndex + 1;
    let totalQuestionsSize = questions.length;

    // Validate current answer
    if (currentAnswer === questions[currentQuestionIndex].correct_answer) {
      totalScore += 1;
    }

    if (nextIndex < totalQuestionsSize) {
      dispatch({ type: TRIVIA_NEXT_QUESTION, payload: { currentQuestionIndex: nextIndex, totalScore } });
    }
    else {
      dispatch({ type: TRIVIA_GAME_OVER, payload: totalScore });
      // Call game over screen and disable back action
      Actions.gameOver({ type: 'reset' });
    }
  }
};

/**
 * @description Start Trivia Game.
 */
export const startGame = () => {

  return (dispatch) => {
    dispatch({ type: TRIVIA_START_GAME });
    // Call start game and disable back action
    Actions.triviaGame({ type: 'reset' });
  }
};
