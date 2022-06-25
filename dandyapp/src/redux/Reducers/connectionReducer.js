import {
  WIFI_STATUS,
} from '../ActionTypes';

const initialState = {
  loading: true,
  wifi: "",
  connectionStatus: false,
  seralNo: "1",
};

const ConnectionReducer = (state = initialState, action) => {
  switch (action.type) {
    case WIFI_STATUS:
      return {
        ...state,
        loading: false,
        wifi: action.payload.cname,
        connectionStatus: true,
        seralNo: action.payload.serial,
      };
    default:
      return state;
  }
};

export default ConnectionReducer;
