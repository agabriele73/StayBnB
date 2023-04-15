import React from "react";
import * as reviewActions from "../../store/reviews";
import { useDispatch, useSelector } from "react-redux";
// import { useParams } from "react-router-dom";
// import { useHistory } from "react-router-dom";
import { useModal } from '../../context/Modal';





const ConfirmReviewDeleteModal = ({ reviewId }) => {
    const dispatch = useDispatch();
    const reviews  = useSelector(state => Object.values(state.reviews.reviews));
    // const { spotId } = useParams();
    // const history = useHistory();
    const { closeModal } = useModal();


    const handleDelete = async (e) => {
        e.preventDefault();

        const review = reviews.find(review => review.id === parseInt(reviewId));

       await dispatch(reviewActions.deleteReviewThunk(review.id)).then(closeModal)

    
        
    }

    const handleNo = () => {
        closeModal();
    }

    return (
        <div className="confirm-container">
            <form onSubmit={handleDelete}>

            <h1>Confirm Delete</h1>
            <p className="confirm-question">Are you sure you want to delete?</p>
            <div className="confirm-buttons">
            <button type="submit" className="confirm-button">Yes (Delete Review)</button>
            <button className="confirm-button" onClick={handleNo}>No (Keep Review)</button>
            </div>
            </form>

        </div>
    )
}


export default ConfirmReviewDeleteModal;