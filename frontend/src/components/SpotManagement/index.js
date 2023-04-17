import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as spotsActions from "../../store/spots";
import './SpotManagement.css';
import OpenModalButton from '../OpenModalButton';
// import { useRef } from "react";
import {  Link } from "react-router-dom";
import ConfirmDelete from "../ConfirmDeleteModal";

const SpotManagement = () => {
    const dispatch = useDispatch();
    const spots = useSelector(state => Object.values(state.spots.spots));
    // const currSpot = useSelector(state => state.spots.spotDetails);
    // const [showModal, setShowModal] = useState(false);

    
    useEffect(() => {

        
        dispatch(spotsActions.fetchCurrUserSpots())
        
        
        
        
        
    }, [dispatch]);
    
    // const renderStars = (avgRating) => {
    //     const maxRating = 5;
    //     const starWidth = 18;
    //     const starHeight = 16;
    //     const starStyle = {
    //         width: `${starWidth}px`,
    //         height: `${starHeight}px`,
    //         display: "inline-block",
            
    //     };
        
    //     let stars = [];
    //     const fullStars = Math.floor(avgRating)
    //     for (let i = 0; i < fullStars; i++) {
    //         stars.push(<div key={i} className="fa-solid fa-star" style={starStyle}></div>);
    //     }
        
    //     const halfStars = avgRating - fullStars;
    //     if (halfStars > 0) {
    //         stars.push(<div key="half-star" className="fa-solid fa-star-half-alt" style={starStyle}></div>);
    //     }
        
        
        
    //     const remainingStars = maxRating - stars.length;
    //     for (let i = 0; i < remainingStars; i++) {
    //         stars.push(<div key={maxRating - 1} className="far fa-star" style={starStyle}></div>)
    //     }
        
    //     return stars;
    // }
    
 
    

    

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
                            <img className='spots-image' src={spot.previewImage} alt={spot.name} style={{ height:  '300px'}} />
                            
    
                        <div className="card-text">
                            <p>{spot.city}, {spot.state}</p>
                            {(spot.avgRating === null) ? <div className="stars-container"><p className="fa-solid fa-star">New</p></div> : <div className="stars-container"><p className="fa-solid fa-star">{spot.avgRating}</p></div>}
                            <p>${Number.isInteger(spot.price) ? spot.price.toFixed(2) : spot.price} night</p>
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