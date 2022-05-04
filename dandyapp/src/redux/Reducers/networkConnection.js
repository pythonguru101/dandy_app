import {
    CONNECT_TO_WIFI,CONNECT_TO_WIFI_FAILURE,CONNECT_TO_WIFI_SUCCESS
  } from '../ActionTypes';
  
  const initialState = {
    loading: true,
    connectionStatus: false,
    wifiCreds: {},
  };
  
  const NetworkReducer = (state = initialState, action) => {
    switch (action.type) {
      case CONNECT_TO_WIFI:
        return {
          ...state,
          loading: false,
          wifiCreds: action.payload,
        };
        case CONNECT_TO_WIFI_SUCCESS:
        return {
          ...state,
          loading: false,
          wifiCreds: action.payload,
          connectionStatus: true,
        };
        case CONNECT_TO_WIFI_FAILURE:
        return {
          ...state,
          loading: false,
          wifiCreds: action.payload,
          connectionStatus: false,
        };
      default:
        return state;
    }
  };
  
  export default NetworkReducer;
  