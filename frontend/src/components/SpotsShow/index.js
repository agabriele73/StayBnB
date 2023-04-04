import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import * as spotsActions from "../../store/spots";
import './SpotShow.css';



function SpotsShow({isLoaded}) {
    const dispatch = useDispatch();
    const spots = useSelector(state => state.spots.spots);



    useEffect(() => {
        dispatch(spotsActions.fetchSpots());
    }, [dispatch]);

    return isLoaded && (
        <div className="spots-container">
            {spots.map(spot => (
                <div className="spot-card" key={spot.id} data-spot-name={spot.name}>
                        <img className='spots-image' src={spot.previewImage} alt={spot.name} style={{width: '200px', height: '200px'}} />
                        <p>{spot.city}, {spot.state}</p>
                        <p>${spot.price}/night</p>
                </div>
            ))}
        </div>

    )
}


export default SpotsShow;