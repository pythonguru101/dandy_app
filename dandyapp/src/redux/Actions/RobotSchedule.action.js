import {SET_SAVE_SCHEDULE,DELETE_SCHEDULE} from '../ActionTypes'

export const setSaveSchedule = (data) => {
    return {
        type: SET_SAVE_SCHEDULE,
        payload: data
    }
    }

export const deleteSchedule = (data) => {
    console.log(data)
    return {
        type: DELETE_SCHEDULE,
        payload: data
    }
    }
