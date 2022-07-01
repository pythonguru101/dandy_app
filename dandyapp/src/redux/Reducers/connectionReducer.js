import {
  WIFI_STATUS, SET_HOME_SSID
} from '../ActionTypes';

const initialState = {
  loading: true,
  wifi: "",
  connectionStatus: false,
  seralNo: "1",
  homeSSID: "",
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

    case SET_HOME_SSID:
      return {
        ...state,
        homeSSID: action.payload,
      };

    default:
      return state;
  }
};

export default ConnectionReducer;
