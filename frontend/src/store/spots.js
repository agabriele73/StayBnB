
import { csrfFetch } from "./csrf";

const initialState = {
    spotDetails: null,
    spots: {}
};

export const SET_SPOTS = 'spots/SET_SPOTS';
export const SET_SPOT_DETAILS = 'spots/SET_SPOT_DETAILS';
export const CREATE_SPOT = 'spots/CREATE_SPOT';
export const CREATE_SPOT_IMAGE = 'spots/CREATE_SPOT_IMAGE';
export const UPDATE_SPOT = 'spots/UPDATE_SPOT'

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

export const createSpotImage = (spotId, spotImage) => ({
    type: CREATE_SPOT_IMAGE,
    spotImage,
    spotId
})
export const updateSpot = (spot) => ({
    type: UPDATE_SPOT,
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

export const postSpot = (spot, spotImages) => async dispatch => {
    let spotId
    let newSpot
    let newImages = {}
    const response = await csrfFetch('/api/spots', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(spot)
    });
    
    if(response.ok) {

        newSpot = await response.json();
        console.log('this is new spot',newSpot)
        //dispatch(createSpot(newSpot.newSpot));
        spotId = newSpot.newSpot.id

    }
    if (spotId) {
        spotImages.forEach(async spotImage => {
            if (spotImage.url) {
                if(spotImage.previewImg) {
                    newSpot.previewImage = spotImage.url
                }
                const response2 = await csrfFetch(`/api/spots/${spotId}/images`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(spotImage)
                })
                if(response2.ok) {
                    
                    const newSpotImage = await response2.json();
                    newImages[newSpotImage.id] = newSpotImage
                    //console.log('this is new spotImage',newSpotImage)
                    return newSpotImage
                }
            }
        })
    }
    //console.log('new spot from thunk',newSpot)
    //dispatch(createSpotImage(spotId, newSpotImage));
    dispatch(createSpot(newSpot.newSpot))
    return newSpot
}

export const fetchCurrUserSpots = () => async dispatch => {
    const response = await csrfFetch('/api/spots/current');
    const data = await response.json();
    dispatch(setSpots(data.Spots));
}


// export const postSpotImage = (spotId, spotImage) => async dispatch => {
//     const response = await csrfFetch(`/api/spots/${spotId}/images`, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(spotImage)
//     })
//     if(response.ok) {
//         const newSpotImage = await response.json();
//         console.log('this is new spotImage',newSpotImage)
//         dispatch(createSpotImage(spotId, newSpotImage.newSpotImage));
//         return newSpotImage
//     }
// }

// export const fetchSpotReviews = (spotId) => async dispatch => {
//     const response = await csrfFetch(`/api/spots/${spotId}`)
//     const data = await response.json();
//     const reviewsResponse = await csrfFetch(`/api/spots/${spotId}/reviews`);
//     const reviewsData = await reviewsResponse.json();
//     dispatch(setSpotDetails({...data, reviews: reviewsData}));
// }

const spotsReducer = (state = initialState, action) => {
    let newState = {...state};
    switch (action.type) {
        case SET_SPOTS:
            let normalizedSpots = {}; 
            action.spots.forEach(spot => {
                normalizedSpots[spot.id] = spot
            })
            newState.spots = normalizedSpots
            return newState
        case SET_SPOT_DETAILS:
            newState.spotDetails = action.spotDetails
             return newState
        case CREATE_SPOT:
            console.log('new spot from reducer',action)
            newState.spots[action.spot.id] = action.spot
            return newState
        default:
            return state;
    }
}


export default spotsReducer;

