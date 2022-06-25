import axios from 'axios';


// const baseUrl = 'http://127.0.0.1:';

// export const setWifiCreds = (serialNo, value) => {
//     console.log("Set Wifi cred", value);
//     return axios.post(baseUrl + serialNo + '/connect-with-robot', { ssid: value.ssid, password: value.password });
// };

// export const setFencingCoords = (serialNo, value) => {
//     console.log(value);
//     return axios.post(baseUrl + serialNo + '/robot-location-fencing', value);
// };

// export const getdeviceslocation = (serialNo,) => {
//     return axios.get(baseUrl + serialNo + "/get-robot-current-location");
// }


// export const checkSoftwareUpdate = (serialNo,) => {
//     return axios.get(baseUrl + serialNo + "/check-update");

// }

// export const startUpdate = (serialNo, value) => {
//     return axios.post(baseUrl + serialNo + "/update-software", value)
// }



export const setWifiCreds = (serialNo, value) => {
    console.log("Set Wifi cred", value, serialNo);
    return axios.post(`http://dandy-robot-${serialNo}.local:5000` + '/connect-with-robot', { ssid: value.ssid, password: value.password });
};

export const setFencingCoords = (value) => {
    console.log(value);
    return axios.post(`http://dandy-robot-${serialNo}.local:5000` + '/robot-location-fencing', value);
};

export const getdeviceslocation = (serialNo) => {
    return axios.get(`http://dandy-robot-${serialNo}.local:5000` + "/get-robot-current-location");
}


export const checkSoftwareUpdate = (serialNo) => {
    return axios.get(`http://dandy-robot-${serialNo}.local:5000` + "/check-update");

}

export const startUpdate = (serialNo, value) => {
    return axios.post(`http://dandy-robot-${serialNo}.local:5000` + "/update-software", value)
}

