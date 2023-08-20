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
            <li >
                <ProfileButton user={sessionUser} />
            </li>
        )
    } else {
        sessionLinks = (
            
            <>
            
            <li className='session-login'>
                <OpenModalButton 
                    buttonText="Log In"
                    modalComponent={<LoginFormModal />}
                    className='nav-button'
                />
            </li>
            <li className='session-signup'>
                <OpenModalButton
                    buttonText="Sign Up"
                    modalComponent={<SignupFormModal />}
                    className='nav-button'
                />

            </li>
            </>
        )
    }
    return (
        <ul className='nav-ul'>
            <li className='nav-button'>
                <NavLink exact to="/">
                    <img className='home-image' src={homeIcon} alt="home"/>
                </NavLink>
            </li>
            {isLoaded && sessionLinks}
        </ul>
    )
}


export default Navigation;