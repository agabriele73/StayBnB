import {csrfFetch } from "./csrf";

const initialState = {
        reviews : {},
}

const SPOT_REVIEWS = 'reviews/SPOT_REVIEWS';

export const setReviews = (reviews) => ({
    type: SPOT_REVIEWS,
    reviews
})

export const fetchReviews = (spotId) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`);
    const data = await response.json();

    dispatch(setReviews(data));
}

const reviewReducer = (state = initialState, action) => {
    let newState = {...state};
    switch (action.type) {
        case SPOT_REVIEWS:
            newState.reviews = action.reviews;
            return newState;
        default:
            return state;
    }
}


export default reviewReducer;

