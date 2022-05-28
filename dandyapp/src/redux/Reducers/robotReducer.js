// reducer for storing Fencing data
import { GET_ROBOT_LOCATION, GET_ROBOT_LOCATION_FAILURE, GET_ROBOT_LOCATION_SUCCESS } from '../ActionTypes';

const initialState = {
    loading: true,
    data: null,
    error: null,
};

const RobotReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ROBOT_LOCATION:
            return {
                ...state,
                loading: false,
                data: action.payload,
                error: null,
            };
        case GET_ROBOT_LOCATION_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload,
                error: null,
            };
        case GET_ROBOT_LOCATION_FAILURE:
            return {
                ...state,
                loading: false,
                data: null,
                error: action.payload,
            };
        default:
            return state;
    }
}
export default RobotReducer;