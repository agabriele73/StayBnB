// frontend/src/components/LoginFormPage/index.js

import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal'; 
import { Link } from 'react-router-dom';

import './LoginForm.css';


function LoginFormModal() {
    const dispatch = useDispatch();
    const [credential, setCredential] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);
    const { closeModal } = useModal();
    const isCredentialValid = credential.length >= 4;
    const isPasswordValid = password.length >= 6;
    const isFormValid = isCredentialValid && isPasswordValid;

    const handelDemoUser = (e) => {
        e.preventDefault();
        dispatch(sessionActions.demoLoginThunk()).then(closeModal);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        return dispatch(sessionActions.loginThunk({ credential, password }))
        .then(closeModal)
        .catch(
            async (res) => {
            const data = await res.json()
            if (data && data.message) {
                setErrors([...errors, data.message])
            } else {
                setErrors([...errors, 'Something went wrong. Please try again.'])
            }
        })
    }
    console.log(errors);

    
    return (
        <>
        <form onSubmit={handleSubmit} className="login-modal">
            <h1 className='login-h1'>Log In</h1>
            <ul>
                {errors.map((error, idx) => ( 
                    <li key={idx}>{error}</li>
                    ))}
            </ul>    
                <input
                    className='login-input'
                    type="text"
                    placeholder='Username or Email'
                    value={credential}
                    onChange={(e) => setCredential(e.target.value)}
                    required
                />
                <input
                    className='login-input'
                    type="password"
                    placeholder='Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            <button type="submit" className='login-button' disabled={!isFormValid}>Log In</button>
            <Link to='#' onClick={handelDemoUser} className='demo-user'>Demo User</Link>
        </form>
        </>
    )
}


export default LoginFormModal;