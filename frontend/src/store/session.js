import { csrfFetch } from "./csrf";

export const SET_SESSION = 'session/SET_SESSION';
export const REMOVE_SESSION = 'session/REMOVE_SESSION';


export const setSession = (user) => ({
    type: SET_SESSION,
    user
})

export const removeSession = () => ({
    type: REMOVE_SESSION
})

const initialState = {
    user: null
}

export const loginThunk = (user) => async dispatch => {
    const {credential, password} = user
    const response = await csrfFetch('/api/session', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            credential,
            password
        })
        
    })
    const data = await response.json();
    dispatch(setSession(data.user));
    return response
}

const sessionReducer = (state = initialState, action) => {
    let newState = {...state};
    switch(action.type) {
        case SET_SESSION:
            return {
                ...state,
                user: action.user
            }
        case REMOVE_SESSION:
            return {
                user: null
            }
        default:
            return state;
    }
}





export default sessionReducer;