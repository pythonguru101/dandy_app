import {
  CONNECTED_TO,
  WIFI_STATUS,
  CONNECT_TO_WIFI,
  SAVE_FENCING,
  GET_ROBOT_LOCATION,
  SET_ONBOARDING,

} from '../ActionTypes';
import axios from 'axios';
import { getdeviceslocation } from '../../services/services'


export const connectedTo = (ssid) => {
  return {
    type: CONNECTED_TO,
    payload: ssid
  };
}

export const currentConnection = (cname, serial) => {
  return {
    type: WIFI_STATUS,
    payload: { cname, serial }
  };
};

export const connectToWifi = (data) => {
  return {
    type: CONNECT_TO_WIFI,
    payload: data
  };
}

export const saveFencing = (data) => {
  console.log("save", data)
  return {
    type: SAVE_FENCING,
    payload: data
  }
}


export function setRobotData(data) {

  return {

    type: GET_ROBOT_LOCATION,

    payload: data,

  };

}

export function getRobotData(serialNo) {
  return async (dispatch) => {
    try {
      const apiReq = (await getdeviceslocation(serialNo)).data
      console.log("actions api", apiReq)
      await dispatch(setRobotData(apiReq));
      return apiReq || [];
    } catch (error) {
      console.error(error);
    }
  };
}

export const setOnboarding = () => {
  return {
    type: SET_ONBOARDING,
  };
}
