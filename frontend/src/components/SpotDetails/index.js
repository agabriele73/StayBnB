import React, { useEffect} from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import * as spotsActions from "../../store/spots";

function SpotDetails({ isLoaded }) {
    const { spotId } = useParams();
    const dispatch = useDispatch();
    const spots = useSelector(state => state.spots.spots);
    const spot = spots ? spots[spotId] : null;

    useEffect(() => {
        dispatch(spotsActions.fetchSpots());
    }, [dispatch]);

    return isLoaded && spot ? (
        <div className="spotdetail-container">
            <h1>Spot Details</h1>
            <p>{spot.name}</p>
            <p>{spot.city}, {spot.state}, {spot.country}</p>
            <img src={spot.previewImage} alt={spot.name} style={{height: '300px', width: '300px'}}/>
            <p>{spot.description}</p>
            <div className="reserve-container">
                <button>Reserve</button>
                
            </div>
        </div>
    ) : null;
}


export default SpotDetails;