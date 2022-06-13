import {SET_SAVE_SCHEDULE,DELETE_SCHEDULE} from '../ActionTypes'

const initialState = {
    loading: false,
    error: null,
    data: [],
}

const ScheduleReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_SAVE_SCHEDULE:
            return {
                ...state,
                loading: false,
                error: null,
                data: [...state.data,action.payload]
            }

            case DELETE_SCHEDULE:
                return {
                    ...state,
                    loading: false,
                    error: null,
                    data: state.data.filter(item => item.id !== action.payload.id)
                }
        default:
            return state
    }
}

export default ScheduleReducer