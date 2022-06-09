import { GET_ROBOTS, GET_ROBOT_LOCATION, GET_ROBOTS_FAILURE, GET_ROBOTS_SUCCESS, SET_ROBOT_DATA, SET_ROBOT_DATA_SUCCESS, SET_ROBOT_DATA_FAILURE } from '../ActionTypes';


export const getRobots = () => {
    return {
        type: GET_ROBOTS,
    };
}

export const getRobotLocation = (id) => {
    return {
        type: GET_ROBOT_LOCATION,
        payload: id
    };
}

export const setRobotData = (data) => {
    return {
        type: SET_ROBOT_DATA,
        payload: data
    };
}
