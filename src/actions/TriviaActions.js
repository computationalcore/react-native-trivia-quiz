import { AllHtmlEntities as entities } from 'html-entities';
import {
  TRIVIA_FETCH_SUCCESS,
  TRIVIA_FETCH_ERROR,
} from './types';
import * as TriviaAPI from '../TriviaAPI';

/**
 * @description Fetch the questions, parse the response and dispatch success or error action.
 */
export const triviaFetch = () => {
  
  return (dispatch) => {
    TriviaAPI.getQuestions().then((questions) => {
      const formatedQuestions = questions.map(
        question => {
          const options = question.incorrect_answers;
          options.push(question.correct_answer);
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
      dispatch({ type: TRIVIA_FETCH_SUCCESS, payload: formatedQuestions });
    }).catch(function () {
      dispatch({ type: TRIVIA_FETCH_ERROR });
    });
  }
};