import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as spotsActions from "../../store/spots";
import './SpotManagement.css';
import OpenModalButton from '../OpenModalButton';
import { useRef } from "react";
import { useHistory, Link } from "react-router-dom";

const SpotManagement = () => {
    const dispatch = useDispatch();
    const spots = useSelector(state => Object.values(state.spots.spots));
    const currSpot = useSelector(state => state.spots.spotDetails);
    const [showModal, setShowModal] = useState(false);

    
    useEffect(() => {
        dispatch(spotsActions.fetchCurrUserSpots())
        
        
        
        
        
    }, [dispatch]);
    
    const renderStars = (avgRating) => {
        const maxRating = 5;
        const starWidth = 18;
        const starHeight = 16;
        const starStyle = {
            width: `${starWidth}px`,
            height: `${starHeight}px`,
            display: "inline-block",
            
        };
        
        let stars = [];
        const fullStars = Math.floor(avgRating)
        for (let i = 0; i < fullStars; i++) {
            stars.push(<div key={i} className="fa-solid fa-star" style={starStyle}></div>);
        }
        
        const halfStars = avgRating - fullStars;
        if (halfStars > 0) {
            stars.push(<div key="half-star" className="fa-solid fa-star-half-alt" style={starStyle}></div>);
        }
        
        
        
        const remainingStars = maxRating - stars.length;
        for (let i = 0; i < remainingStars; i++) {
            stars.push(<div key={maxRating - 1} className="far fa-star" style={starStyle}></div>)
        }
        
        return stars;
    }
    
    
    const ConfirmDelete = () => {
        const history = useHistory();
        const modalRef = useRef(null);

        useEffect(() => {
            const closeModal = (e) => {
                if (modalRef.current && !modalRef.current.contains(e.target)) {
                    setShowModal(false)
                }
            }

            document.addEventListener("mousedown", closeModal);

            return () => document.removeEventListener("mousedown", closeModal);
        }, [])
        
        const handleDelete = () => {
            dispatch(spotsActions.spotDeleteThunk(currSpot.id));
            history.push('/spots/current');
        }


        return (
            <div className="confirm-container" ref={modalRef}>
                <h1 >Confirm Delete</h1>
                <p className="confirm-question">Are you sure you want to delete this spot?</p>
            <div className="confirm-buttons">
                    <button className="confirm-button" onClick={handleDelete}>Yes (Delete Spot)</button>
                <button className="confirm-button">No (Keep Spot)</button>
            </div>
            </div >
        )
    }

    

    

        return spots && (
            <div>
                <h1 style={{'fontFamily': 'cursive'}}>Manage Your Spots</h1>


                {spots.length === 0 ? (

                    <Link to='/spots/new'>
                        <button>Create a New Spot</button>
                    </Link>
                ) : null}
    
                <div className="spots-container">
                {spots.map(spot => (
                    
                    <Link to={`/spots/${spot.id}`} className="spot-link" key={spot.id}> 
    
    
                    <div className="spot-card" key={spot.id} data-spot-name={spot.name}>
                            <img className='spots-image' src={spot.previewImage} alt={spot.name} style={{ height: '200px'}} />
                            
    
                        <div className="card-text">
                            <p>{spot.city}, {spot.state}</p>
                            {(spot.avgRating === null) ? <p className="spot-new">New</p> : <div className="stars-container">{renderStars(spot.avgRating)}{spot.avgRating}</div>}
                            <p>${spot.price}/night</p>
                        </div>
    
                        <div className="update-delete">
                        <Link to={`/spots/${spot.id}/edit`}>
                            <button>Update</button>

                        </Link>
                        < OpenModalButton
                            buttonText={'Delete'}
                            className={'delete-button'}
                            modalComponent={< ConfirmDelete/>}
                            
                        />
                        </div>
                            
                    </div>
                    </Link>
                ))}
                </div>
            </div>
    
        )
    }



export default SpotManagement;