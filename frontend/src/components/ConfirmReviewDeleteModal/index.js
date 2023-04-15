import React from "react";
import * as reviewActions from "../../store/reviews";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";






const ConfirmReviewDeleteModal = ({ reviewId }) => {
    const dispatch = useDispatch();
    const reviews  = useSelector(state => Object.values(state.reviews.reviews));
    const { spotId } = useParams();
    const history = useHistory();



    const handleDelete = (e) => {
        e.preventDefault();

        const review = reviews.find(review => review.id === parseInt(reviewId));

        dispatch(reviewActions.deleteReviewThunk(review.id));

        

        
    }


    return (
        <div>
            <h1>Confirm Delete</h1>
            <p>Are you sure you want to delete?</p>
            <button onClick={handleDelete}>Yes (Delete Review)</button>
            <button>No (Keep Review)</button>
        </div>
    )
}


export default ConfirmReviewDeleteModal;