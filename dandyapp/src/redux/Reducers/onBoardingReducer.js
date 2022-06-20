import { SET_ONBOARDING } from '../ActionTypes';

const initialState = {
    onboarding: true,
}

const obBoardingReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ONBOARDING:
            return {
                ...state,
                onboarding: false,
            };
        default:
            return state;
    }
}

export default obBoardingReducer;
