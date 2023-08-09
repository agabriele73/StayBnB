import React, { useState, useEffect  } from "react";
import * as reviewActions from "../../store/reviews";
import { useSelector, useDispatch } from "react-redux";
// import {  useHistory } from "react-router-dom";
import "./PostReview.css"

import { useModal } from '../../context/Modal';


const PostReviewModal = () => {
    // const { spotId } = useParams();
    const [review, setReview] = useState("");
    const [starRating, setStarRating] = useState(0);
    const [errors, setErrors] = useState({});
    // const [modalOpen, setModalOpen] = useState(true);
    const dispatch = useDispatch();
    // const user = useSelector(state => state.session.user);
    const spot = useSelector(state => state.spots.spotDetails);
    //const history = useHistory();
    const { closeModal } = useModal();

    const handleRatingChange = (e) => {
        setStarRating(e.target.value);

        
    }

    useEffect(() => {
        const handleKeyPress = (e) => {
            if (e.key === "Escape") {
                closeModal();
            }
        };

        window.addEventListener("keydown", handleKeyPress);

        return () => {
            window.removeEventListener("keydown", handleKeyPress);
        };
    }, [closeModal]);
    

    const handleSubmit = async (e) => {
        e.preventDefault();

        
        const newReview = {
        
            review,
            stars: parseInt(
                starRating, 10
            )
        }

        await  dispatch(reviewActions.postReview(spot.id, newReview)).then(closeModal).catch((error) => {
            setErrors({...errors, errors: "Review already exists for this spot"});
        })
        
        
    }
    

    
    // const handleClick = () => {
    //     closeModal();
    // }
    
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
            <p>
                review must be more than 10 characters
            </p>
                <div className="error">
                
                {Object.values(errors).map((error, idx) => (
                    <p key={idx}>{error}</p>
                ))}
                </div>
            <form onSubmit={handleSubmit}>
                <textarea name="review" placeholder="Leave your review here..." onChange={(e) => setReview(e.target.value)}></textarea>
                <div className="stars">
                    
                    {renderStars()} 
                
                    <p>stars</p>
                </div>
                <button disabled={review.length <  10}  >Submit Your Review</button>
            </form>
        </div>
    
        
    )
}


export default PostReviewModal;