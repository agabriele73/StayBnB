import React, { useState} from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import * as sessionActions from '../../store/session';
import './SignupForm.css';


function SignupFormModal() {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState([]);
    const { closeModal } = useModal();



    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === confirmPassword) {
            setErrors([]);
            return dispatch(sessionActions.signup({
                email,
                username,
                firstName,
                lastName,
                password
            }))
            .then(closeModal)
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            })
        }
        return setErrors (['Confirm Password field must be the same as the Password field'])
    }

    return (
        <>
        <h1 className="signup-h1">Sign Up</h1>
        <form onSubmit={handleSubmit} className= 'signup-modal'>
            <ul>
                {errors.map((error, idx) => <li key={idx}>{error}</li>)}
            </ul>
            <label className='label'>
                Email:
                <input
                    className= "input"
                    type='text'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    />
            </label>
            <label className='label'>
                Username:
                <input 
                    className="input"        
                    type='text'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    />
            </label>
            <label className='label'>
                First Name:
                <input 
                    className= "input"
                    type='text'
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                    />
            </label>
            <label className='label'>
                Last Name:
                <input
                    className= "input"
                    type='text'
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required 
                />
            </label>
            <label className='label'>
                Password:
                <input
                    className= "input"
                    type='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </label>
            <label className='label'>
                Confirm Password:
                <input  
                    className= "input"
                    type='password'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
            </label>
            <button type='submit' className='signup-button'>Sign Up</button>
        </form>
        </>
    )
}



export default SignupFormModal;