import SpotDetails from "../components/SpotDetails";
import { csrfFetch } from "./csrf";

const initialState = {
    spotDetails: null 
};

export const SET_SPOTS = 'spots/SET_SPOTS';
export const SET_SPOT_DETAILS = 'spots/SET_SPOT_DETAILS';


export const setSpots = (spots) => ({
    type: SET_SPOTS,
    spots
})

export const setSpotDetails = (spotDetails) => ({
    type: SET_SPOT_DETAILS,
    spotDetails
})


export const fetchSpots = () => async dispatch => {
    const response = await csrfFetch('/api/spots');
    const data = await response.json();
    dispatch(setSpots(data.Spots));
}

export const fetchSpotDetails = (spotId) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}`);
    const data = await response.json();
    dispatch(setSpotDetails(data));
}

export const fetchSpotReviews = (spotId) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}`)
    const data = await response.json();
    const reviewsResponse = await csrfFetch(`/api/spots/${spotId}/reviews`);
    const reviewsData = await reviewsResponse.json();
    dispatch(setSpotDetails({...data, reviews: reviewsData}));
}

const spotsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_SPOTS:
            let normalizedSpots = {}; 
            action.spots.forEach(spot => {
                normalizedSpots[spot.id] = spot
            })
            return {...state, spots: normalizedSpots};
        case SET_SPOT_DETAILS:
             return {...state, spotDetails: action.spotDetails};
        default:
            return state;
    }
}


export default spotsReducer;

