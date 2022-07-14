import axios from 'axios';


const baseUrl = 'http://dandy-robot-';
const port = '.local:5000';
// const baseUrl='http://127.0.0.1:'
// const port=''

export const pingToServer = (serialNo) => {
    console.log("Ping to device", baseUrl + serialNo + '/')
    return axios.get(baseUrl + serialNo + port +'/');
}

export const setWifiCreds = (serialNo, value) => {
    console.log("Set Wifi cred", baseUrl + serialNo + port + '/connect-with-robot', value);
    return axios.post(baseUrl + serialNo + port + '/connect-with-robot', { ssid: value.ssid, password: value.password });
};

export const setFencingCoords = (serialNo, value) => {
    console.log("Set Fencing Coords", baseUrl + serialNo + port + '/robot-location-fencing', value);
    return axios.post(baseUrl + serialNo + port + '/robot-location-fencing', value);
};

export const getdeviceslocation = (serialNo) => {
    console.log("Get Device location", baseUrl + serialNo + port + '/get-robot-current-location');
    return axios.get(baseUrl + serialNo + port + "/get-robot-current-location");
}


export const checkSoftwareUpdate = (serialNo) => {
    console.log("Check Software Update", baseUrl + serialNo + port + '/check-update');
    return axios.get(baseUrl + serialNo + port + "/check-update");

}

export const startDownloadingUpdate = (serialNo, value) => {
    console.log("Start Downloading Updates", baseUrl + serialNo + port + '/download-update', value);
    return axios.post(baseUrl + serialNo + port + "/download-update", value)
}

export const startUpdate = (serialNo, value) => {
    console.log("Start Downloading Updates", baseUrl + serialNo + port + '/update-software', value);
    return axios.post(baseUrl + serialNo + port + "/update-software", value)
}

export const getRobotHistory = (serialNo) => {
    console.log("Start Downloading Updates", baseUrl + serialNo + port + '/get-robot-history');
    return axios.get(baseUrl + serialNo + port + "/get-robot-history")
}