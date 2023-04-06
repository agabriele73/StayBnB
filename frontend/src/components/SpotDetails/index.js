import React, { useEffect} from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import * as spotsActions from "../../store/spots";

function SpotDetails({ isLoaded }) {
    const { spotId } = useParams();
    const dispatch = useDispatch();
    const spots = useSelector(state => state.spots.spots);
    const spot = useSelector(state => state.spots.spotDetails);
    console.log('this is the spot',spot)

    useEffect(() => {
        dispatch(spotsActions.fetchSpotDetails(spotId));
    }, [dispatch, spotId]);

    const handleReserve = (e) => {
        e.preventDefault();
        window.alert('Feature coming soon!');
    }

    return isLoaded && spot ? (
        <div className="spotdetail-container">
            <h1>Spot Details</h1>
            <p>{spot.name}</p>
            <p>{spot.city}, {spot.state}, {spot.country}</p>
            {spot.SpotImages.map(image => (
                <img src={image.url} alt={spot.name} key={image.id} style={{height: '300px', width: '300px'}}/>
            ))}
            <p>{spot.description}</p>
            <div className="reserve-container">
                <p>${spot.price}/night</p>
                <button onClick={handleReserve}>Reserve</button>
                
            </div>
        </div>
    ) : null;
}


export default SpotDetails;