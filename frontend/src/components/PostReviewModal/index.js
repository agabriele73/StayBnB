import React, { useState } from "react";
import * as reviewActions from "../../store/reviews";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import "./PostReview.css"



const PostReviewModal = () => {
    const { spotId } = useParams();
    const [review, setReview] = useState("");
    const [starRating, setStarRating] = useState(0);
    const [errors, setErrors] = useState([]);
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);
    const spot = useSelector(state => state.spots.spotDetails);

    const handleRatingChange = (e) => {
        setStarRating(e.target.value);

        
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        
        const newReview = {
          
            review,
            stars: parseInt(
                starRating, 10
            )
        }

       await  dispatch(reviewActions.postReview(spot.id, newReview)).then(() => {

           setReview("")
           setStarRating(0);
           setErrors({});
       }

        ).catch((error) => {
            setErrors([...errors, "Review already exists for this spot"]);
        })



    }

    
    const renderStars = () => {
        const stars = [];

        for (let i = 1; i <= 5; i++) {
            stars.push(
                <label key={i}>
                    <input 
                        type='radio'
                        name='rating'
                        value={i}
                        onChange={handleRatingChange}
                        style={{ display: "none" }}
                    />
                    <i className={i <= starRating ? "fas fa-star checked" : "far fa-star checked" }
                        onClick={() => setStarRating(i)}
                    />
                </label>
            )
        }
        return stars;
    }

    return (
        <div className="reviewform-container">
            <h1>How was your stay?</h1>
                <p className="error">
                
                {errors}
                </p>
            <form onSubmit={handleSubmit}>
                <textarea name="review" placeholder="Leave your review here..." onChange={(e) => setReview(e.target.value)}></textarea>
                <div className="stars">
                    <p>
                    {renderStars()} 
                    </p>
                    <p>stars</p>
                </div>
                <button disabled={review.length <  10}>Submit Your Review</button>
            </form>
        </div>
    )
}


export default PostReviewModal;