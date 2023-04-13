import React, { useState } from "react";



const PostReviewModal = () => {
    const [review, setReview] = useState("");
    const [starRating, setStarRating] = useState(0);

    const handleRatingChange = (e) => {
        setStarRating(e.target.value);
    }




    const renderStars = () => {
        const stars = [];

        for (let i = 0.5; i <= 5; i++) {
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
        <div className="review-form"> 
            <h1>How was your stay?</h1>
            <form>
                <textarea name="review" placeholder="Leave your review here..." onChange={(e) => setReview(e.target.value)}></textarea>
                <div className="stars">
                    {renderStars()} 
                    <p>stars</p>
                </div>
                <button disabled={review.length <  10}>Submit Your Review</button>
            </form>
        </div>
    )
}


export default PostReviewModal;