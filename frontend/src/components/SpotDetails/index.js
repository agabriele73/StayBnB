import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

function SpotDetails({ isLoaded }) {
    const { spotId } = useParams();
    const spot = useSelector(state => state.spots.spots[Number(spotId)]);

    console.log(spot);
    return isLoaded && (
        <div>
            <h1>Spot Details</h1>
            <p>{spot.name}</p>
            <p>{spot.city}, {spot.state}, {spot.country}</p>
            <p>{spot.description}</p>
        </div>
    );
}


export default SpotDetails;