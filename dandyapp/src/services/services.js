import axios from 'axios';


const baseUrl = 'http://dandy-robot-';
const port = '.local:5000';


export const pingToServer = (serialNo) => {
    return axios.get(baseUrl + serialNo + '/');
}

export const setWifiCreds = (serialNo, value) => {
    console.log("Set Wifi cred", baseUrl + serialNo + '/connect-with-robot');
    return axios.post(baseUrl + serialNo + port + '/connect-with-robot', { ssid: value.ssid, password: value.password });
};

export const setFencingCoords = (serialNo, value) => {
    console.log(value);
    return axios.post(baseUrl + serialNo + port + '/robot-location-fencing', value);
};

export const getdeviceslocation = (serialNo) => {
    return axios.get(baseUrl + serialNo + port + "/get-robot-current-location");
}


export const checkSoftwareUpdate = (serialNo) => {
    return axios.get(baseUrl + serialNo + port + "/check-update");

}

export const startDownloadingUpdate = (serialNo, value) => {
    return axios.post(baseUrl + serialNo + port + "/update-software", value)
}

