import React, { useState } from "react";
import './SpotForm.css';
import { useDispatch, useSelector } from "react-redux";
import * as spotsActions from "../../store/spots";
import { useHistory } from "react-router-dom";




function SpotForm() {
    const dispatch = useDispatch();
    const history = useHistory();
    
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [address, setAddress] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [previewImage, setPreviewImage] = useState({url: '', previewImg: true});
    const [image2, setImage2] = useState({url: '', previewImg: false});
    const [image3, setImage3] = useState({url: '', previewImg: false});
    const [image4, setImage4] = useState({url: '', previewImg: false});
    const [image5, setImage5] = useState({url: '', previewImg: false});
    const [name, setName] = useState('');
    const [errors, setErrors] = useState([]);


    const currSpotDetails = useSelector(state => state.spots.spotDetails)
    console.log('this is curr spot', currSpotDetails)


    const handleSubmit = async (e) => {
        e.preventDefault();
        const spotImages = [previewImage, image2, image3, image4, image5]

        const formData = {
            country,
            city,
            state,
            address,
            description,
            price,
            name
        }
    
        await dispatch(spotsActions.postSpot(formData, spotImages)).then((spot) => {
            let spotId = parseInt(spot.newSpot.id, 10)
            history.push(`/spots/${spotId}`)
        }).catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) {
                setErrors(...errors, data.errors);
                } else {
                setErrors(...errors, 'Something went wrong');
             }
        })


    }

      

    // const handleChange = (e) => {
    //     setFormData({
    //         ...formData,
    //         [e.target.name]: e.target.value
    //     })
    // }

    // const handleImageChange = (e, index) => {
    //     const newImageUrls = [...formData.images];

    //     newImageUrls[index] = e.target.value;

    //     setFormData({
    //         ...formData,
    //         images: newImageUrls
    //     })
    // }

    return (
<div className="create-spot">


    <form className="spot-form" onSubmit={handleSubmit}>
        {errors.map((error, idx) => (
            <p key={idx} className="errors">{error}</p>
        ))}
        <h1>Create a new Spot</h1>

        <div className="section-1">
            <h3>Where's your place located at?</h3>
            <h4>Guest will only get your exact address once they booked a reservation</h4>
            <label>
                Country
                <input type="text"  value={country} placeholder="Country" onChange={(e) => setCountry(e.target.value)} required/>
            </label>
            <br />
            <label>
                Street Address
                <input type="text"  value={address} placeholder="Address" onChange={(e) => setAddress(e.target.value)} required/>
            </label>
            <br />
            <label>
                City
                <input type="text" value={city} placeholder="City" onChange={(e) => setCity(e.target.value)} required/>
            </label>,
            <label>
                State
                <input type="text"  value={state} placeholder="State"  onChange={(e) => setState(e.target.value)} required/>
            </label>
        </div>



        <div className="section-2">
            <h3>Describe your place to guests</h3>
            <h4>Mention the best featuires of your space, any special amenities like fast wifi or parking, and what you love about the neighborhood.</h4>
            <textarea value={description} placeholder="Please Write at least 30 characters"   onChange={(e) => setDescription(e.target.value)} minLength='30'></textarea>
            <br />
        </div>


        <div className="section-3">
            <h3>Create a title for your spot</h3>
            <h4>Catch guests attention with a spot title that highlights what makes your place special.</h4>
            <input type="text"  value={name} placeholder="Name of your spot" onChange={(e) => setName(e.target.value)}  />
            <br />
        </div>


        <div className="section-4">
            <h3>Set a base price for your Spot</h3>
            <h4>Competitive pricing can help your listing stand out and rank higher in search results.</h4>
            <label>
                $ <input type="text" value={price} placeholder="Price per night (USD)" onChange={(e) => setPrice(e.target.value)} />
            </label>
            <br />
        </div>


        <div className="section-5">
            <h3>Liven up your spot with photos</h3>
            <h4>Submit a link to at least one photo to publish your spot.</h4>
            <input type="text"  placeholder="Preview Image URL" value={previewImage.url} onChange={(e) => setPreviewImage({url: e.target.value, previewImg: true})} />
            <br />
            <input type="text"  placeholder="Image URL" value={image2.url}  onChange={(e) => setImage2({url: e.target.value, previewImg: false})}/>
            <br />
            <input type="text"  placeholder="Image URL" value={image3.url}  onChange={(e) => setImage3({url: e.target.value, previewImg: false})}/>
            <br />
            <input type="text"  placeholder="Image URL" value={image4.url}  onChange={(e) => setImage4({url: e.target.value, previewImg: false})}/>
            <br />
            <input type="text"  placeholder="Image URL" value={image5.url}  onChange={(e) => setImage5({url: e.target.value, previewImg: false})}/>
            <br />
        </div>


            <button type="submit" className="spot-button">Create Spot</button>
    </form>
</ div>
    )
}


export default SpotForm;