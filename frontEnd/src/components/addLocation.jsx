import React from 'react';
import { useState } from 'react';
import { addLocation } from '../api';
import { Navigate } from 'react-router-dom';



function AddLocation(){

    const [city, setCity] = useState('');
    const [zipcode, setzipcode] = useState('');
    const [isButtonClicked, setIsButtonClicked] = useState(false)
    const [shouldRedirect, setShouldRedirect] = useState(false)



    const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  const handleZipcodeChange = (e) => {
    setzipcode(e.target.value);
  };


  const handleClick = () => {
    setIsButtonClicked(!isButtonClicked)
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(isButtonClicked){
        const resp = await addLocation({"city":city,"zipcode":zipcode})
        setCity('');
        setzipcode('')
        console.log(resp)
        if(resp.success !== 'Location added successfully.'){
          alert(`Oops something went wrong!`);
        }else{
         setShouldRedirect(true)
        }
    }
   };
   if (shouldRedirect) {
    return <Navigate to="/home" />
   } else {
    return (
        <div className='container mt-4'>
            <div className="row">
                <div className="col-md-9 col-12 mb-2">
                <div className="card">
                  <h4 className="card-header">Add Location</h4>
                  <div className="card-body">
                        <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                                <label name="city" className="form-label">City</label>
                                <input 
                                type="text" 
                                className="form-control" 
                                id="city" 
                                name="city"
                                value={city}
                                onChange={handleCityChange}
                                required
                                />
                            </div>
                            <div className="mb-3">
                                <label name="zipcode" className="form-label">Zipcode</label>
                                <input 
                                type="text" 
                                className="form-control" 
                                id="zipcode" 
                                name='zipcode'
                                value={zipcode}
                                onChange={handleZipcodeChange}
                                required
                                />
                            </div>
                            <button type="submit" className="btn btn-primary" onClick={handleClick}>Submit</button>
                        </form>
                  </div>
                  </div>
                </div>
            </div>
        </div>
    )
   }
};

export default AddLocation;