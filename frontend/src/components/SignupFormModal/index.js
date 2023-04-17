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
                if (data && data.errors) return setErrors(data.errors);
            })
        }
        return setErrors (['Confirm Password field must be the same as the Password field'])
    }

    const handleDisabled = () => {
        if (
            !email ||
            !username ||
            !firstName ||
            !lastName ||
            !password ||
            !confirmPassword ||
            username.length < 4 ||
            password.length < 6 ||
            password !== confirmPassword
        ) {
            return false
        } else {
            return true
        }
    }

    return (
        <div className='signup-container'>
        <h1 className="signup-h1">Sign Up</h1>
        <form onSubmit={handleSubmit} className= 'signup-modal'>
            <ul >
                {Object.values(errors).map((error, idx) => {
                return (
                    <li className='signup-errors' key={idx}>{error}</li>)})}

            
            </ul>
           
                <input
                    className= "input"
                    type='text'
                    placeholder='Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    />
    
          
                <input 
                    className="input"        
                    placeholder='Username'
                    type='text'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    />
           
          
                <input 
                    className= "input"
                    type='text'
                    placeholder='First Name'
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                    />
            
           
                <input
                    className= "input"
                    type='text'
                    placeholder='Last Name'
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required 
                />
            
        
                <input
                    className= "input"
                    type='password'
                    placeholder='Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
        
                <input  
                    className= "input"
                    type='password'
                    value={confirmPassword}
                    placeholder='Confirm Password'
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
            <button type='submit' className='signup-button' disabled={!handleDisabled()}>Sign Up</button>
        </form>
        </div>
    )
}



export default SignupFormModal;