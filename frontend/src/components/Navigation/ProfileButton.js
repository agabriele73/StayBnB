import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";
import { NavLink, useHistory } from "react-router-dom";


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
        history.push('/')
    }

    const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");


    // const handleClick = (e) => {
    //     e.preventDefault();

    //     history.push('/spots/new')
    // }

    return (
        <>
        <div className="outer-buttons">
            <NavLink to={`/spots/new`} style={{ "textDecoration": "none"}}>
                Create a New Spot
            </NavLink>
            <button onClick={openMenu}>
                <i className="fa-solid fa-user fa-sm"></i>
            </button>

        </div>
        <div className="inner-buttons">

            <ul className={ulClassName} ref={ulRef} style={{ "listStyle": "none", "border": "solid 2px black", "wordSpacing": "5px", "paddingLeft": "1px", "boxShadow": "5px 5px 10px #333"}}>
                <li style={{ "marginBottom": "10px"}}>Hello, {user.firstName}</li>
                <br/>
                <li style={{ "marginBottom": "10px", "borderBottom": "1px solid #000000", "width": "100%", "padding": "5px 0"}}>{user.email}</li>
                < NavLink to={`/spots/current`} style={{ "textDecoration": "none"}}>
                    <li style={{ "marginBottom": "10px", "borderBottom": "1px solid #000000", "width": "100%", "padding": "5px 0"}}>
                      Manage Spots
                    </li>
                </NavLink>                
                <li  style={{ "display": "flex", "justifyContent": "center", "marginBottom": "4px", "boxShadow": "none"}}>
                    <button onClick={logout}>Logout</button>
                </li>
            </ul>
        </div>
        </>
    )
}


export default ProfileButton;