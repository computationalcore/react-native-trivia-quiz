import {
  TRIVIA_FETCH_SUCCESS,
  TRIVIA_NEXT_QUESTION,
  TRIVIA_GAME_OVER
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
  }],
  currentQuestionIndex:  0,
  totalScore: 0,
  startTime: 0,
  endTime: 0,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TRIVIA_FETCH_SUCCESS:
      return { 
        ...state, 
        questions: action.payload, 
        totalQuestionsSize: action.payload.length,
        startTime: (new Date).getTime(),
      };
    case TRIVIA_NEXT_QUESTION:
      return { 
        ...state, 
        currentQuestionIndex: action.payload.currentQuestionIndex,
        totalScore: action.payload.totalScore,
      };
    case TRIVIA_GAME_OVER:
      return { 
        ...state, 
        totalScore: action.payload,
        endTime: (new Date).getTime(),
      };
    default:
      return state;
  }
};