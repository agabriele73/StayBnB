import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";
import { Link, NavLink, useHistory } from "react-router-dom";


const ProfileButton = ({user}) => {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef()
    const history = useHistory();

    useEffect(() => {
        if (!showMenu) return

        const closeMenu = (e) => {
            if(!ulRef.current.contains(e.target)) {
                setShowMenu(false)
            }
        }
        document.addEventListener("click", closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const openMenu = () => {
        if (showMenu) return
        setShowMenu(true)
    }

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout());
    }

    const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");


    const handleClick = (e) => {
        e.preventDefault();

        history.push('/spots/new')
    }

    return (
        <>
            <NavLink to={`/spots/new`} >
                Create a New Spot
            </NavLink>
            <button onClick={openMenu}>
                <i className="fa-solid fa-user fa-sm"></i>
            </button>
            <ul className={ulClassName} ref={ulRef}>
                <li>Hello, {user.firstName}</li>
                <li>{user.email}</li>
                <li>
                    <button onClick={logout}>Logout</button>
                </li>
            </ul>
        </>
    )
}


export default ProfileButton;