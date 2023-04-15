import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as reviewActions from "../../store/reviews";
import * as spotActions from "../../store/spots";
import OpenModalButton from "../OpenModalButton";
import PostReviewModal from "../PostReviewModal";
import { useParams } from "react-router-dom";
import ConfirmReviewDeleteModal from "../ConfirmReviewDeleteModal";



const SpotReviews = () => {
    const dispatch = useDispatch();
    const reviews  = useSelector(state => Object.values(state.reviews.reviews));
    console.log('these are the reviews----', reviews);
    const spot = useSelector(state => state.spots.spotDetails);
    const user = useSelector(state => state.session.user);
    const { spotId } = useParams();

   
    useEffect(() => {
        dispatch(reviewActions.fetchReviews(spotId));
        dispatch(spotActions.fetchSpotDetails(spotId));
    }, [dispatch, spotId]);
    
  
    
const renderPostReview = () => {
        if (reviews.length === 0 || (user && user.id !== spot.Owner.id)) {
            return (
                <div>
                    <OpenModalButton 
                        buttonText="Post Your Review"
                        modalComponent={<PostReviewModal />}

                    />
                </div>

            )
        }
    }


    if (reviews.length === 0 && spot && user.id !== spot.Owner.id) {
        return (
            <div>
                <p>Be the first to post a review!</p>
                <OpenModalButton 
                        buttonText="Post Your Review"
                        modalComponent={<PostReviewModal />}

                    />

                
            </div>
        )
    }

   
    // console.log(e.target.id)
    
    return reviews.length && spot && (
        <div className="review-container">
            {renderPostReview()}
            {reviews.map(review => (
                <div key={review.id}>
                    <p>{review.User.firstName}</p>
                    <p>{new Date(review.createdAt).toLocaleString('en-us', {month: 'long', year: 'numeric'})}</p>
                    <p>{review.review}</p>
                    {review.User.id === user.id && (
                        <OpenModalButton 
                            buttonText="Delete"
                            modalComponent={<ConfirmReviewDeleteModal reviewId={review.id}/>}
                        
                        />
                    )}
                </div>
            ))}
        </div>
    )
    //  return (
    //     <h1>reviews</h1>
    //  )
     
    

}


export default SpotReviews;