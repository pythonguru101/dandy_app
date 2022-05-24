import axios from 'axios';
import { createServer } from "miragejs"

const baseUrl = 'http://localhost:3001/api/';

export const setWifiCreds = (ssid, password) => {
    return axios.post('wifi/set', { ssid, password });
};

export const getdeviceslocation = () => {
    return axios.get("api/robot/location");
}



if (window.server) {
    server.shutdown()
}
window.server = createServer({
    routes() {
        this.post("api/wifi/set", (schema, request) => {
            let attrs = JSON.parse(request.requestBody)
            console.log("mock api", attrs)
            return {
                success: true,
                message: "Wifi credentials set"
            }
        })
    },

    routes() {
        this.post("api/fencing/set", (schema, request) => {
            let attrs = JSON.parse(request.requestBody)
            console.log("mock api", attrs)
            return {
                success: true,
                message: "fencing coordinates set",
                data: attrs
            }
        })
    },

    routes() {
        this.get("api/robot/location", () => {
            // debugger
            return {
                success: true,
                message: "robot location get",
                data: { coordinates: { latitude: 12.9, longitude: 77.6 } }
            }
        })
    },

})
