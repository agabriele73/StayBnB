import React from "react";
import { useSelector, useDispatch } from "react-redux";
import * as spotsActions from "../../store/spots";
import { useRef } from "react";
import { useHistory } from "react-router-dom";
import { useModal } from '../../context/Modal';

const ConfirmDelete = () => {
    const history = useHistory();
    const modalRef = useRef(null);
    const dispatch = useDispatch();
    // const spots = useSelector(state => Object.values(state.spots.spots));
    const currSpot = useSelector(state => state.spots.spotDetails);
    const { closeModal } = useModal();

    
    
    const handleDelete = async (e) => {
        e.preventDefault();
        dispatch(spotsActions.spotDeleteThunk(currSpot.id)).then(closeModal);
        history.push('/spots/current');
    }

    const handleNo = () => {
        closeModal();
        history.push('/spots/current');
    }
    return (
        <div className="confirm-container" ref={modalRef}>
            <h1 >Confirm Delete</h1>
            <p className="confirm-question">Are you sure you want to delete this spot?</p>
        <div className="confirm-buttons">
                <button className="confirm-button" onClick={handleDelete}>Yes (Delete Spot)</button>
            <button className="confirm-button" onClick={handleNo}>No (Keep Spot)</button>
        </div>
        </div >
    )
}

export default ConfirmDelete;