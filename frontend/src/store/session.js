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
        body: JSON.stringify({
            credential,
            password
        })
        
    })
    const data = await response.json();
    dispatch(setSession(data.user));
    return response
}

export const restoreUser = () => async dispatch => {
    const response = await csrfFetch('/api/session');
    const data = await response.json();
    dispatch(setSession(data.user));
    return response
}

export const signUp = (user) => async dispatch => {
    const { username, firstName, lastName, email, password } = user;
    const response = await csrfFetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({
            username,
            firstName,
            lastName,
            email,
            password
        })
    })
    const data = await response.json();
    dispatch(setSession(data.user));
    return response
}

const sessionReducer = (state = initialState, action) => {
    let newState 
    switch(action.type) {
        case SET_SESSION:
            newState = Object.assign({}, state)
            newState.user = action.user
            return newState
        case REMOVE_SESSION:
            newState = Object.assign({}, state)
            newState.user = null
            return newState
        default:
            return state;
    }
}





export default sessionReducer;