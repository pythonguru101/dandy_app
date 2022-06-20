import axios from 'axios';


const baseUrl = 'http://dandy_robot.local:5000';

export const setWifiCreds = (value) => {
    console.log("Set Wifi cred", value);
    return axios.post(baseUrl + '/connect-with-robot', { ssid: value.ssid, password: value.password });
};

export const setFencingCoords = (value) => {
    console.log(value);
    return axios.post(baseUrl + '/robot-location-fencing', value);
};

export const getdeviceslocation = () => {
    return axios.get(baseUrl + "/get-robot-current-location");
}



export const checkSoftwareUpdate = () => {
    return axios.get(baseUrl + "/check-software-update");

}

