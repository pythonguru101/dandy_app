import {
  INCREMENT
} from '../ActionTypes';

const initialState = {
  loading: true,
  count: 0
};

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case INCREMENT:
      return {
        ...state,
        loading: false,
        count: state.count + 1
      };
    default:
      return state;
  }
};

export default AuthReducer;
