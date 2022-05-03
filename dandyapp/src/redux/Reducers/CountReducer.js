import {
  INCREMENT
} from '../ActionTypes';

const initialState = {
  loading: true,
  wifi: "",
};

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case INCREMENT:
      return {
        ...state,
        loading: false,
        count: action.payload,
      };
    default:
      return state;
  }
};

export default AuthReducer;
