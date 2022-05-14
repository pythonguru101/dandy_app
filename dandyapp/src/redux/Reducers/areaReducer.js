// reducer for storing Fencing data
import {SAVE_FENCING,SAVE_FENCING_SUCCESS,SAVE_FENCING_FAILURE} from '../ActionTypes';

const initialState = {
    loading: true,
    data: null,
    error: null,    
};

    const FencingReducer = (state = initialState, action) => {
        switch (action.type) {
            case SAVE_FENCING:
                return {
                    ...state,
                    loading: false,
                    data: action.payload,
                    error: null,
                };
            case SAVE_FENCING_SUCCESS:
                return {
                    ...state,
                    loading: false,
                    data: action.payload,
                    error: null,
                };
            case SAVE_FENCING_FAILURE:
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
    export default FencingReducer;