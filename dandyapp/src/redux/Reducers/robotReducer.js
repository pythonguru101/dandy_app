// reducer for storing Fencing data
import {
    GET_ROBOTS,
    GET_ROBOT_LOCATION,
    GET_ROBOTS_FAILURE,
    GET_ROBOTS_SUCCESS,
    SET_ROBOT_DATA,
    SET_ROBOT_DATA_SUCCESS,
    SET_ROBOT_DATA_FAILURE,
    GET_ROBOT_LOCATION_SUCCESS,
    GET_ROBOT_LOCATION_FAILURE
} from '../ActionTypes';


const initialState = {
    loading: true,
    robots: [],
    connectedTo: null,
    currentDevice: {},
    error: null,
};

// this is the reducer for storing robots and robots data and error
function RobotReducer(state = initialState, action) {
    switch (action.type) {
        case GET_ROBOTS:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case GET_ROBOTS_SUCCESS:
            return {
                ...state,
                loading: false,
                robots: action.payload,
            };
        case GET_ROBOTS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case GET_ROBOT_LOCATION:
            return {
                ...state,
                loading: true,
                error: null,
                currentDevice: action.payload
            };
        case GET_ROBOT_LOCATION_SUCCESS:
            return {
                ...state,
                loading: false,
                currentDevice: action.payload,
            };
        case GET_ROBOT_LOCATION_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case SET_ROBOT_DATA:
            return {
                ...state,
                loading: false,
                robots: [...state.robots, action.payload],
            };
        case SET_ROBOT_DATA_SUCCESS:
            return {
                ...state,
                loading: false,
                robots: [...state.robots, action.payload],
            };
        case SET_ROBOT_DATA_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
}


export default RobotReducer;