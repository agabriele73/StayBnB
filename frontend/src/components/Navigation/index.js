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
            <div className='session-buttons'>

            <li>
                <OpenModalButton 
                    buttonText="Log In"
                    modalComponent={<LoginFormModal />}
                    className='nav-button'
                />
                <OpenModalButton
                    buttonText="Sign Up"
                    modalComponent={<SignupFormModal />}
                    className='nav-button'
                />
            </li>
            </div>
        )
    }
    return (
        <ul className='nav-ul'>
            <li className='nav-button'>
                <NavLink exact to="/"><img className='home-image' src={homeIcon} alt="home"/></NavLink>
            </li>
            {isLoaded && sessionLinks}
        </ul>
    )
}


export default Navigation;