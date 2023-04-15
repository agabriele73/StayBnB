import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import * as spotsActions from "../../store/spots";
import './SpotShow.css';



function SpotsShow({isLoaded}) {
    const dispatch = useDispatch();
    const spots = useSelector(state => Object.values(state.spots.spots));

    
    useEffect(() => {

            dispatch(spotsActions.fetchSpots());
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


 

    return isLoaded && spots && (
        <div className="spots-container">
            {spots.map(spot => (
                
                <Link to={`/spots/${spot.id}`} className="spot-link" key={spot.id}> 


                <div className="spot-card"  data-spot-name={spot.name}>
                        <img className='spots-image' src={spot.previewImage} alt={spot.name} style={{ height: '300px'}} />
                        

                        <div className="card-text">
                        <p>{spot.city}, {spot.state}</p>
                        {isNaN(spot.avgRating) ? <div className="stars-container"><p className="spot-new">New</p></div> : <div className="stars-container"><p className='fa-solid fa-star'>{spot.avgRating}</p></div>}

                        <p>${spot.price}/night</p>
                        </div>
                        
                </div>
                </Link>
            ))}
        </div>

    )
}


export default SpotsShow;