import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { weatherInformation } from '../api'
import { useState } from 'react';


function Home(){
  const [city, setCity] = useState('');
  const [weatherdata, setWeatherdata] = useState('');
  const [isButtonClicked, setIsButtonClicked] = useState(false)


    const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  const handleClick = () => {
    setIsButtonClicked(!isButtonClicked)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(isButtonClicked){
        const context = (city)
        const weather = await weatherInformation(context)
        setWeatherdata(weather)
        console.log(weatherdata)
        if(!weather)
        alert(`Oops something went wrong. Try that again`);
        setCity('');
    }
  }

    return (
        <main className='mt-4'>
        <div className='container'>
          {/* Latest Products */}
          
          <div className='row mb-4'>
          <div classNameName='col-12 col-md-3 mb-4'>
            <section className="vh-100">
        <div className="container py-5 h-100">
        <form onSubmit={handleSubmit}>
            <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-md-8 col-lg-6 col-xl-4">
               
                <h3 className="mb-4 pb-2 fw-normal">Check the weather forecast</h3>
                
                <div className="input-group rounded mb-3">
                <input 
                type="text" 
                className="form-control" 
                id="city" 
                name="city"
                value={city}
                onChange={handleCityChange}
                aria-label="Search"
                aria-describedby="search-addon" />
                <a href="#!" type="button">
                    <button className="btn btn-primary ms-1" onClick={handleClick}>
                    Check!
                    </button>
                </a>
                </div>
                  {weatherdata && (
                          <div className='card shadow-0 border'>
                            <div className='card-body p-4'>
                              <h4 className='mb-1 sfw-normal'>{weatherdata.location.name}</h4>
                              <p className='mb-2'>Current temperature: <strong>{weatherdata.current.temperature}°C</strong></p>
                              <p>Feels like: <strong>{weatherdata.current.feelslike}°C</strong></p>
                              <p>Max: <strong>{weatherdata.current.temperature}°C</strong>, Min: <strong>{weatherdata.current.temperature}°C</strong></p>
                              <div className='d-flex flex-row align-items-center'>
                                <p className='mb-0 me-4'>{weatherdata.current.weather_descriptions.join(', ')}</p>
                                {/* Replace the following icon with a dynamic one based on the weather */}
                                <img src={weatherdata.current.weather_icons[0]} />
                              </div>
                            </div>
                          </div>
                      )}

                            </div>
                          </div>
                          </form>
                        </div>
                      </section>
                    </div>
                      </div>
                      {/* End Latest Products */}
                    </div>
                  </main>
    );
};

export default Home;