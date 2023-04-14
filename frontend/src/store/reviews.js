import {csrfFetch } from "./csrf";

const initialState = {
        reviews : {},
}

const SPOT_REVIEWS = 'reviews/SPOT_REVIEWS';
const POST_REVIEW = 'reviews/POST_REVIEW';


export const setReviews = (reviews) => ({
    type: SPOT_REVIEWS,
    reviews
})

export const createReview = (review) =>  ({
    type: POST_REVIEW,
    review
})

export const fetchReviews = (spotId) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`);
    const data = await response.json();

    dispatch(setReviews(data));
}


export const postReview = (spotId, review) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(review)
    })
    const newReview = await response.json();
    console.log('this is the new review-------', newReview)
    dispatch(createReview(newReview));
    return newReview
}

const reviewReducer = (state = initialState, action) => {
    let newState = {...state};
    switch (action.type) {
        case SPOT_REVIEWS:
            let normalizedReviews = {};
            action.reviews.forEach(review => {
                normalizedReviews[review.id] = review
            })
            newState.reviews = normalizedReviews;
            return newState;
        case POST_REVIEW:
            newState.reviews[action.review.id] = action.review;
            return newState;
        default:
            return state;
    }
}


export default reviewReducer;

