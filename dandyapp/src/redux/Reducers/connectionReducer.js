import {
   WIFI_STATUS
  } from '../ActionTypes';
  
  const initialState = {
    loading: true,
    wifi: "",
    connectionStatus: false,
  };
  
  const ConnectionReducer = (state = initialState, action) => {
    switch (action.type) {
      case WIFI_STATUS:
        return {
          ...state,
          loading: false,
          wifi: action.payload,
            connectionStatus: true,
        };
      default:
        return state;
    }
  };
  
  export default ConnectionReducer;
  