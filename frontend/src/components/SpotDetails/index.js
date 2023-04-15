import React, { useEffect} from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import * as spotsActions from "../../store/spots";
import "./SpotDetail.css";
import OpenModalButton from "../OpenModalButton";
import PostReviewModal from "../PostReviewModal";
import * as reviewActions from "../../store/reviews";
import { flushSync } from "react-dom";


function SpotDetails({ isLoaded }) {
    const { spotId } = useParams();
    const dispatch = useDispatch();
    // const spots = useSelector(state => state.spots.spots);
    const spot = useSelector(state => state.spots.spotDetails);
     const user = useSelector(state => state.session.user);
   
    useEffect(() => {
        dispatch(spotsActions.fetchSpotDetails(spotId));
        // dispatch(reviewActions.fetchReviews(spotId));
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

    // const renderPostReview = () => {
    //     if (user && user.id !== spot.Owner.id) {
    //         return (
    //             <div className="review-container">
    //                 <OpenModalButton 
    //                     buttonText="Post Your Review"
    //                     modalComponent={<PostReviewModal />}

    //                 />
    //             </div>

    //         )
    //     }
    // }

    return isLoaded && spot ? (
        <div className="spotdetail-container">

           
            <h1>{spot.name}</h1>
            <p className="location">{spot.city}, {spot.state}, {spot.country}</p>


            <div className="grid-container">

            {spot.SpotImages.map(image => (
                <div className='item' key={image.id}>

                    <img src={image.url} alt={spot.name}   />
                </div>
            ))}
            </div>

                <div className="description-grid">

               <div>    
                <p>Hosted by {spot.Owner.firstName} {spot.Owner.lastName}</p>
                <p>{spot.description}</p>
               </div>

            
                <div className="reserve-grid">
                <p className="price">${spot.price.toFixed(2)} night</p>
                {spot.avgStarRating === null ? 
                <p className="fa-solid fa-star">New</p> : 
                <p className="fa-solid fa-star">{spot.avgStarRating.toFixed(1)} <p>&nbsp;&middot;&nbsp;</p> {spot.numReviews} {spot.numReviews === 1 ? 'review' : 'reviews'}</p>}
                <button onClick={handleReserve}  className="reserve-button">Reserve</button>
                </div>

                
                </div>
            
            


           



            <div className="review-count">

            {spot.numReviews === 0 ?

             
            (
            <div style={{ "display": "flex", "alignItems": "center", "justifyContent": "center", "wordSpacing": "5px"}}>
                <p className="fa-solid fa-star">New   </p>   
            </div>
                ) : (
 
            <div className="reviews">
            {spot.avgStarRating === null ? 
                <p className="spot-new">New</p> : 
                <div className="stars-container">{renderStars(spot.avgStarRating)}{spot.avgStarRating.toFixed(1)}</div>}
                <p>
                <p>

                &nbsp;&middot;&nbsp;
                </p>
                </p>
                <h2>{spot.numReviews} {spot.numReviews === 1 ? 'review' : 'reviews'}</h2>

            </div>
            )}
            </div>
        </div>
    
    ) : null;
}


export default SpotDetails;