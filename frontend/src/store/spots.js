import { csrfFetch } from "./csrf";

const initialState = {};

export const SET_SPOTS = 'spots/SET_SPOTS';

export const setSpots = (spots) => ({
    type: SET_SPOTS,
    spots
})


export const fetchSpots = () => async dispatch => {
    const response = await csrfFetch('/api/spots');
    const data = await response.json();
    dispatch(setSpots(data.Spots));
}

const spotsReducer = (state = initialState, action) => {
    let newState
    switch (action.type) {
        case SET_SPOTS:
            newState = Object.assign({}, state)
            newState.spots = action.spots
            return newState
        default:
            return state;
    }
}


export default spotsReducer;

