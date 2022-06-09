import {
  CONNECTED_TO
} from '../ActionTypes';

const initialState = {
  loading: true,
  connectionStatus: false,
  wifiCreds: '',
};

const NetworkReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONNECTED_TO:
      return {
        ...state,
        loading: false,
        wifiCreds: action.payload,
        connectionStatus: true
      };
    // case CONNECT_TO_WIFI_SUCCESS:
    //   return {
    //     ...state,
    //     loading: false,
    //     wifiCreds: action.payload,
    //     connectionStatus: true,
    //   };
    // case CONNECT_TO_WIFI_FAILURE:
    //   return {
    //     ...state,
    //     loading: false,
    //     wifiCreds: action.payload,
    //     connectionStatus: false,
    //   };
    default:
      return state;
  }
};

export default NetworkReducer;
