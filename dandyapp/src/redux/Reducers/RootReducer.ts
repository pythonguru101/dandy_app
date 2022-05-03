import {combineReducers} from 'redux';

//Import all reducers in here
import CountReducer from './CountReducer';
import connectionReducer from './connectionReducer';

export default combineReducers({
  count: CountReducer,
  connection: connectionReducer
});
