// import axios from 'axios';


// const baseUrl = 'http://dandy-robot-5.local:5000';

// export const setWifiCreds = (value) => {
//     console.log("Set Wifi cred", value);
//     return axios.post(baseUrl + '/connect-with-robot', { ssid: value.ssid, password: value.password });
// };

// export const setFencingCoords = (value) => {
//     console.log(value);
//     return axios.post(baseUrl + '/robot-location-fencing', value);
// };

// export const getdeviceslocation = () => {
//     return axios.get(baseUrl + "/get-robot-current-location");
// }


// export const checkSoftwareUpdate = () => {
//     return axios.get(baseUrl + "/check-update");

// }

// export const startUpdate = (value) => {
//     return axios.post(baseUrl + "/update-software", value)
// }

import axios from 'axios';


// const baseUrl = 'http://dandy-robot-5.local:5000';

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

