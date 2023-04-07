
import { csrfFetch } from "./csrf";

const initialState = {
    spotDetails: null 
};

export const SET_SPOTS = 'spots/SET_SPOTS';
export const SET_SPOT_DETAILS = 'spots/SET_SPOT_DETAILS';
export const CREATE_SPOT = 'spots/CREATE_SPOT';


export const setSpots = (spots) => ({
    type: SET_SPOTS,
    spots
})

export const setSpotDetails = (spotDetails) => ({
    type: SET_SPOT_DETAILS,
    spotDetails
})

export const createSpot = (spot) => ({
    type: CREATE_SPOT,
    spot

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

export const postSpot = (spot) => async dispatch => {
    const response = await csrfFetch('/api/spots', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(spot)
    });
    if(response.ok) {
        const newSpot = await response.json();
        dispatch(createSpot(newSpot));
        return newSpot
    }
}

// export const fetchSpotReviews = (spotId) => async dispatch => {
//     const response = await csrfFetch(`/api/spots/${spotId}`)
//     const data = await response.json();
//     const reviewsResponse = await csrfFetch(`/api/spots/${spotId}/reviews`);
//     const reviewsData = await reviewsResponse.json();
//     dispatch(setSpotDetails({...data, reviews: reviewsData}));
// }

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
        case CREATE_SPOT:
            return {...state.spots, ...{[action.spot.id]: action.spot}};
        default:
            return state;
    }
}


export default spotsReducer;

