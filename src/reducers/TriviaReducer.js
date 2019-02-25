import {
  TRIVIA_MAIN_MENU,
  TRIVIA_SELECT_OPTIONS_GAME,
  TRIVIA_START_GAME,
  TRIVIA_FETCH_CATEGORIES_SUCCESS,
  TRIVIA_FETCH_SUCCESS,
  TRIVIA_FETCH_ERROR,
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
  loading: true,
  error: true,
  categories: [{
    label: 'Any',
    value: -1
  }],
  selectedCategoryId: -1,
  selectedDifficulty: 'Mixed',
  numberOfQuestions: 10
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TRIVIA_MAIN_MENU:
      return INITIAL_STATE;
    case TRIVIA_SELECT_OPTIONS_GAME:
      return INITIAL_STATE;
    case TRIVIA_START_GAME:
      return { 
        ...state,
        selectedCategoryId: (action.payload.categoryId) ? action.payload.categoryId : state.selectedCategoryId,
        selectedDifficulty: (action.payload.difficulty) ? action.payload.difficulty : state.selectedDifficulty,
        numberOfQuestions: (action.payload.numberOfQuestions) ? action.payload.numberOfQuestions: state.numberOfQuestions,
        currentQuestionIndex: 0,
        totalScore: 0,
        loading: true,
      };
    case TRIVIA_FETCH_CATEGORIES_SUCCESS:
      return { 
        ...state,
        categories: action.payload,
        loading: false,
        error: '',  
      };
    case TRIVIA_FETCH_SUCCESS:
      return { 
        ...state, 
        questions: action.payload, 
        totalQuestionsSize: action.payload.length,
        startTime: (new Date).getTime(),
        loading: false,
        error: '',  
      };
    case TRIVIA_FETCH_ERROR:
      return { 
        ...state, 
        startTime: (new Date).getTime(),
        loading: false,
        error: true,
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