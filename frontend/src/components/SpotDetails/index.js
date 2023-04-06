import React, { useEffect} from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import * as spotsActions from "../../store/spots";

function SpotDetails({ isLoaded }) {
    const { spotId } = useParams();
    const dispatch = useDispatch();
    const spots = useSelector(state => state.spots.spots);
    const spot = useSelector(state => state.spots.spotDetails);

    useEffect(() => {
        dispatch(spotsActions.fetchSpotDetails(spotId));
        // dispatch(spotsActions.fetchSpotReviews(spotId));
    }, [dispatch, spotId]);

    const handleReserve = (e) => {
        e.preventDefault();
        window.alert('Feature coming soon!');
    }

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
                {spot.avgStarRating === null ? 
                <p className="spot-new">New</p> : 
                <div className="stars-container">{renderStars(spot.avgStarRating)}{spot.avgStarRating}</div>}
            </div>

            {spot.numReviews === 0 ?
             (<h2>No reviews yet for this spot</h2>) : (
 
            <div className="reviews">
            {spot.avgStarRating === null ? 
                <p className="spot-new">New</p> : 
                <div className="stars-container">{renderStars(spot.avgStarRating)}{spot.avgStarRating}</div>}
                <p>
                &nbsp;&middot;&nbsp;
                </p>
                <h2>{spot.numReviews} {spot.numReviews === 1 ? 'Review' : 'Reviews'}</h2>
            

            </div>
            )}
        </div>
    ) : null;
}


export default SpotDetails;