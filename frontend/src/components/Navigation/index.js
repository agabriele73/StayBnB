import React from 'react';
import {NavLink} from 'react-router-dom';
import {useSelector} from 'react-redux';
import ProfileButton from './ProfileButton'; 
import OpenModalButton from '../OpenModalButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import homeIcon from '../../images/airbnbhome.png';
import './Navigation.css';

function Navigation({isLoaded}) {
    const sessionUser = useSelector(state => state.session.user);


    let sessionLinks;
    if (sessionUser) {
        sessionLinks = (
            <li className='profile-button'>
                <ProfileButton user={sessionUser} />
            </li>
        )
    } else {
        sessionLinks = (
            <li>
                <OpenModalButton 
                    buttonText="Log In"
                    modalComponent={<LoginFormModal />}
                    className='login-home-button'
                />
                <OpenModalButton
                    buttonText="Sign Up"
                    modalComponent={<SignupFormModal />}
                    className='signup-home-button'
                />
            </li>
        )
    }
    return (
        <ul className='nav-ul'>
            <li className='home-button'>
                <NavLink exact to="/"><img className='home-image' src={homeIcon} alt="home"/></NavLink>
            </li>
            {isLoaded && sessionLinks}
        </ul>
    )
}


export default Navigation;