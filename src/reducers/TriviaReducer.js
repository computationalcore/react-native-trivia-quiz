import {
  TRIVIA_FETCH_SUCCESS,
} from '../actions/types';

const INITIAL_STATE = {
  questions: [{
    category: '',
    correct_answer: '',
    difficulty: 'easy',
    incorrect_answers: [],
    options: [],
    question: '',
    type: 'boolean',
  }]
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TRIVIA_FETCH_SUCCESS:
      return { 
        ...state, 
        questions: action.payload
      };
    default:
      return state;
  }
};
