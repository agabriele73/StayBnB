import { csrfFetch } from "./csrf";

export const SET_SESSION = 'session/SET_SESSION';
export const REMOVE_SESSION = 'session/REMOVE_SESSION';
export const DEMO_LOGIN = 'session/DEMO_LOGIN';

export const demoLogin = (user) => ({
    type: DEMO_LOGIN,
    user
})


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

export const demoLoginThunk = (user = { username: 'demo', firstName: 'Demo', lastName: 'User', email: 'demo@user.io'}) => async dispatch => {
    const credential = user.email
    const password = 'password'
    const reponse = await csrfFetch('/api/session', {
        method: 'POST',
        body: JSON.stringify({
            credential,
            password
        })

    })
    const data = await reponse.json();
    dispatch(demoLogin(data.user));
    return reponse
}


export const restoreUser = () => async dispatch => {
    const response = await csrfFetch('/api/session');
    const data = await response.json();
    dispatch(setSession(data.user));
    return response
}

export const signup = (user) => async dispatch => {
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
    dispatch(setSession(data));
    return response
}

export const logout = () => async dispatch => {
    const response = await csrfFetch('/api/session', {
        method: 'DELETE'
    })
    dispatch(removeSession());
    return response
}


const sessionReducer = (state = initialState, action) => {
    let newState 
    switch(action.type) {
        case SET_SESSION:
            newState = Object.assign({}, state)
            newState.user = action.user
            return newState
        case DEMO_LOGIN:
            newState = Object.assign({}, state)
            newState.user = { username: 'demo', firstName: 'Demo', lastName: 'User', email: 'demo@user.io'}
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