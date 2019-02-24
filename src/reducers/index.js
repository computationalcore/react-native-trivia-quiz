import { combineReducers } from 'redux';
import TriviaReducer from './TriviaReducer';

export default combineReducers({
  trivia: TriviaReducer,
});
