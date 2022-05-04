import {
  INCREMENT,CONNECTED_TO,WIFI_STATUS, CONNECT_TO_WIFI
} from '../ActionTypes';

export const increment = (status) => {
  return {
    type: INCREMENT,
    payload: status
  };
};

export const connectedTo =(ssid)=>{
  return {
    type: CONNECTED_TO,
    payload: ssid
  };
}

export const currentConnection = (cname) => {
  return {
    type: WIFI_STATUS,
    payload: cname
  };
};

export const connectToWifi = (data) => {
  return {
    type: CONNECT_TO_WIFI,
    payload: data
  };
}