import {combineReducers} from 'redux';

//Import all reducers in here
import CountReducer from './CountReducer';

export default combineReducers({
  count: CountReducer,
});
