import { Actions } from 'react-native-router-flux';
import { AllHtmlEntities as entities } from 'html-entities';
import sortBy from 'sort-by';
import {
  TRIVIA_MAIN_MENU,
  TRIVIA_SELECT_OPTIONS_GAME,
  TRIVIA_START_GAME,
  TRIVIA_FETCH_CATEGORIES_SUCCESS,
  TRIVIA_FETCH_SUCCESS,
  TRIVIA_FETCH_ERROR,
  TRIVIA_NEXT_QUESTION,
  TRIVIA_GAME_OVER
} from './types';
import { shuffleArray } from '../Utils';
import * as TriviaAPI from '../TriviaAPI';

/**
 * @description Fetch the quiz categories, parse the response and dispatch success or error action.
 */
export const triviaCategoryFetch = () => {
  
  return (dispatch) => {
    TriviaAPI.getCategories().then((categories) => {
      //console.log(categories);
      categories = categories.map(
        category => {
          return {
            label: category.name,
            value: category.id
          }
        }
      ).sort(sortBy('label'));
      // Add 'Any' options a the beginning of the array
      categories.unshift({
        label: 'Any',
        value: -1
      });
      dispatch({ type: TRIVIA_FETCH_CATEGORIES_SUCCESS, payload: categories });
    }).catch(function () {
      dispatch({ type: TRIVIA_FETCH_ERROR });
    });
  }
};

/**
 * @description Fetch the questions, parse the response and dispatch success or error action.
 */
export const triviaFetch = (selectedCategoryId, selectedDifficulty, numberOfQuestions) => {
  
  return (dispatch) => {
    TriviaAPI.getQuestions(numberOfQuestions, selectedCategoryId, selectedDifficulty).then((questions) => {
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
            correct_answer: entities.decode(question.correct_answer),
            question: entities.decode(question.question)
          }
        }
      );
      //console.log(formatedQuestions);
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
export const startGame = (categoryId, difficulty, numberOfQuestions) => {
  return (dispatch) => {
    dispatch({ type: TRIVIA_START_GAME, payload: { categoryId, difficulty, numberOfQuestions } });
    // Call start game and disable back action
    Actions.triviaGame({ type: 'reset' });
  }
};

/**
 * @description Start Game Selection.
 */
export const startGameSelection = () => {
  
  return (dispatch) => {
    dispatch({ type: TRIVIA_SELECT_OPTIONS_GAME });
    // Call start game and disable back action
    Actions.triviaSelection({ type: 'reset' });
  }
};

/**
 * @description Go to Main Menu Screen.
 */
export const goToMainMenu = () => {
  
  return (dispatch) => {
    dispatch({ type: TRIVIA_MAIN_MENU });
    // Call start game and disable back action
    Actions.mainMenu({ type: 'reset' });
  }
};
