import {csrfFetch } from "./csrf";

const initialState = {
        reviews : {},
}

const SPOT_REVIEWS = 'reviews/SPOT_REVIEWS';
const POST_REVIEW = 'reviews/POST_REVIEW';
const DELETE_REVIEW = 'reviews/DELETE_REVIEW';


export const setReviews = (reviews) => ({
    type: SPOT_REVIEWS,
    reviews
})

export const createReview = (review) =>  ({
    type: POST_REVIEW,
    review
})

export const deleteReview = (reviewId) => ({
    type: DELETE_REVIEW,
    reviewId
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

export const deleteReviewThunk = (reviewId) => async dispatch => {
    const response = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    const deletedReview = await response.json();
    dispatch(deleteReview(deletedReview));
    return deletedReview
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
        case DELETE_REVIEW:
            delete newState.reviews[action.reviewId];
            return newState
        default:
            return state;
    }
}


export default reviewReducer;

