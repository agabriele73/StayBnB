import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as reviewActions from "../../store/reviews";
import * as spotActions from "../../store/spots";



const SpotReviews = () => {
    const dispatch = useDispatch();
    const reviews  = useSelector(state => Object.values(state.reviews.reviews));
    console.log(reviews);
    const spot = useSelector(state => state.spots.spotDetails);
    const user = useSelector(state => state.session.user);

   

    

    if (reviews.length === 0 && user && user.id !== spot.Owner.id) {
        return (
            <div className="review-container">
                <p>Be the first to post a review!</p>
                <button>Post Your Review</button>
            </div>
        )
    }

    return reviews.length && (
        <div className="review-container">
            {reviews.map(review => (
                <div key={review.id}>
                    <p>{review.User.firstName}</p>
                    <p>{new Date(review.createdAt).toLocaleString('en-us', {month: 'long', year: 'numeric'})}</p>
                    <p>{review.review}</p>
                </div>
            ))}
        </div>
    )
    //  return (
    //     <h1>reviews</h1>
    //  )
     
    

}


export default SpotReviews;