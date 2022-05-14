import {combineReducers} from 'redux';

//Import all reducers in here
import CountReducer from './CountReducer';
import connectionReducer from './connectionReducer';
import NetworkReducer from './networkConnection';
import FencingReducer from './areaReducer';

export default combineReducers({
  count: CountReducer,
  connection: connectionReducer,
  network: NetworkReducer,
  fencing: FencingReducer,
});
