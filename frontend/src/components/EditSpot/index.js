import React, {useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams, useHistory } from "react-router-dom";
import * as spotsActions from "../../store/spots";
import { useEffect } from "react";





const EditSpotForm = () => {
    
    const dispatch = useDispatch();
    const { spotId } = useParams()
    const history = useHistory();

    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [address, setAddress] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [name, setName] = useState('');
    const [errors, setErrors] = useState({});

    const userId  = useSelector(state => state.session.user.id);
    const currSpotDetails = useSelector(state => state.spots.spotDetails)
    const ownerId = useSelector(state => state.spots.spotDetails?.Owner?.id)

    
    
   
    
    useEffect(() => {
        dispatch(spotsActions.fetchSpotDetails(spotId))

        if (currSpotDetails && (userId === ownerId)) {
            setAddress(currSpotDetails?.address || '');
            setCountry(currSpotDetails?.country || '');
            setCity(currSpotDetails?.city || '');
            setState(currSpotDetails?.state || '');
            setDescription(currSpotDetails?.description || '');
            setPrice(currSpotDetails?.price || '');
            setName(currSpotDetails?.name || '');
            
            
    
        }
        
    }, [dispatch, spotId, userId, ownerId])
    
    
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        const spot = {
            address,
            country,
            city,
            state,
            description,
            price,
            name,
        }

        await dispatch(spotsActions.spotUpdate(spot, spotId)).then((spot) => {
            history.push(`/spots/${spotId}`)
        })

     
        
    }

    return currSpotDetails && (
        <div className="create-spot">


    <form className="spot-form" onSubmit={handleSubmit}>

        <h1>Update Spot</h1>

        <div className="section-1">
            <h3>Where's your place located at?</h3>
            <h4>Guest will only get your exact address once they booked a reservation</h4>
            <label>
                Country <p className="errors">{errors.country}</p>
                <input type="text"  value={country} placeholder="Country" onChange={(e) => setCountry(e.target.value)} />
            </label>
            <br />
            <label>
                Street Address <p className="errors">{errors.address}</p>
                <input type="text"  value={address} placeholder="Address" onChange={(e) => setAddress(e.target.value)} />
            </label>
            <br />
            <div className='city-state'>
                <div className="city">
                    <label>
                        City <p className="errors">{errors.city}</p>
                        <input type="text" value={city} placeholder="City" onChange={(e) => setCity(e.target.value)} />
                    </label>,
                </div>
                <div className="state">
                    <label>
                        State <p className="errors">{errors.state}</p>
                        <input type="text"  value={state} placeholder="State"  onChange={(e) => setState(e.target.value)} />
                    </label>
                </div>
            </div>
        </div>



        <div className="section-2">
            <h3>Describe your place to guests</h3>
            <h4>Mention the best featuires of your space, any special amenities like fast wifi or parking, and what you love about the neighborhood.</h4>
            <textarea value={description} placeholder="Please Write at least 30 characters" rows='10'  onChange={(e) => setDescription(e.target.value)} ></textarea>
            <p className="errors">{errors.description}</p>
            <br />
        </div>


        <div className="section-3">
            <h3>Create a title for your spot</h3>
            <h4>Catch guests attention with a spot title that highlights what makes your place special.</h4>
            <input type="text"  value={name} placeholder="Name of your spot" onChange={(e) => setName(e.target.value)}  />
            <p className="errors">{errors.name}</p>
            <br />
        </div>


        <div className="section-4">
            <h3>Set a base price for your Spot</h3>
            <h4>Competitive pricing can help your listing stand out and rank higher in search results.</h4>

            $ <input type="text" value={price} placeholder="Price per night (USD)" onChange={(e) => setPrice(e.target.value)} />
            <p className="errors">{errors.price}</p>


            <br />
        </div>



            <button type="submit" className="spot-button">Update Spot</button>
    </form>
    </div>
    )
}

export default EditSpotForm;