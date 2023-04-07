import React, { useState } from "react";
import './SpotForm.css';
import { useDispatch } from "react-redux";
import * as spotsActions from "../../store/spots";




function SpotForm() {
    const dispatch = useDispatch();
    
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [address, setAddress] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [previewImage, setPreviewImage] = useState('');
    const [image2, setImage2] = useState('');
    const [image3, setImage3] = useState('');
    const [image4, setImage4] = useState('');
    const [image5, setImage5] = useState('');
    const [name, setName] = useState('');


    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = {
            country,
            city,
            state,
            address,
            description,
            price,
            previewImage,
            name
        }


        await dispatch(spotsActions.createSpot(formData));
       

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
<div className="create-spot-page">


    <form className="spot-form" onSubmit={handleSubmit}>
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
                <input type="text"  value={address} placeholder="Address" onChange={(e) => setAddress(e.target.value)} />
            </label>
            <br />
            <label>
                City
                <input type="text" value={city} placeholder="City" onChange={(e) => setCity(e.target.value)}/>
            </label>,
            <label>
                State
                <input type="text"  value={state} placeholder="State"  onChange={(e) => setState(e.target.value)}/>
            </label>
        </div>



        <div className="section-2">
            <h3>Describe your place to guests</h3>
            <h4>Mention the best featuires of your space, any special amenities like fast wifi or parking, and what you love about the neighborhood.</h4>
            <textarea value={description} placeholder="Please Write at least 30 characters"  rows='10'  cols="50" onChange={(e) => setDescription(e.target.value)}></textarea>
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
            <input type="text"  placeholder="Preview Image URL" value={previewImage} onChange={(e) => setPreviewImage(e.target.value)} />
            <br />
            <input type="text"  placeholder="Image URL" value={image2}  onChange={(e) => setImage2(e.target.value)}/>
            <br />
            <input type="text"  placeholder="Image URL" value={image3}  onChange={(e) => setImage3(e.target.value)}/>
            <br />
            <input type="text"  placeholder="Image URL" value={image4}  onChange={(e) => setImage4(e.target.value)}/>
            <br />
            <input type="text"  placeholder="Image URL" value={image5}  onChange={(e) => setImage5(e.target.value)}/>
            <br />
        </div>


            <button type="submit" className="spot-button">Create Spot</button>
    </form>
</ div>
    )
}


export default SpotForm;