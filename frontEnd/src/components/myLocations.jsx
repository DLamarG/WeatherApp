import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react';
import { myWeatherInformation } from '../api';
import MyLocationsData from './myLocations';
import image1 from '../images/image1.jpg';
import image2 from '../images/image2.jpg';
import image3 from '../images/image3.jpg';
import image4 from '../images/image4.jpg';
import image5 from '../images/image5.jpg';
import image6 from '../images/image6.jpg';
import image7 from '../images/image7.jpg';
import image8 from '../images/image8.jpg';
import image9 from '../images/image9.jpg';
import image10 from '../images/image10.jpg';




const backgroundImages = [
  image1,
  image2,
  image3,
  image4,
  image5,
  image6,
  image7,
  image8,
  image9,
  image10
];





const MyLocations = () => {
  const [city, setCity] = useState('');
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [backgroundImage, setBackgroundImage] = useState(backgroundImages[0]);

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  const shuffleBackgroundImage = () => {
    const shuffledImages = [...backgroundImages];
    shuffledImages.sort(() => Math.random()- 0.5);
    setBackgroundImage(shuffledImages[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    shuffleBackgroundImage();
    setLoading(true);

    // Make the API call and update the state with the forecast data
    try {
      const data = await myWeatherInformation(city);
      setForecast(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      // Hide loading after API response
      setLoading(false);
      setCity('')
    }
  };

  return (
    <main className='mt-4' style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: '70%', backgroundRepeat: 'center' }}>
    <div className='container'>
      <form onSubmit={handleSubmit}>
        <div className='input-group rounded mb-3'>
          <label htmlFor='city' className='form-label'>
          <h3 className='mb-3 ' style={{ color: 'white', fontSize: '36px', fontFamily: 'YourChosenFont, sans-serif' }}>
              Check the 3 day weather forecast
          </h3>
          </label>
          <input
            type='text'
            className='width:100px input-group rounded mb-3'
            id='city'
            value={city}
            onChange={handleCityChange}
          />
        </div>
        <button type='submit' className='btn btn-primary'>
          Get Forecast
        </button>
      </form>

      {loading && <p>Loading...</p>}

      <div className='row mt-4'>
      {forecast.map((day) => (
          <div key={day.date} className='col-md-4 mb-4'>
            <div className='card shadow-0 border'>
              <div className='card-body p-4'>
                <h4 className='mb-1 sfw-normal'>{day.name}, {day.region}</h4>
                <p className='mb-2'>Forecast Date: <strong>{day.date}</strong></p>
                <p className='mb-2'>Max Temperature: <strong>{day.max_temp_f}°F</strong></p>
                <p>Conditions: <strong>{day.conditions_text}</strong></p>
                <p>Sunrise: <strong>{day.sunrise}</strong></p>
                <p>Sunset: <strong>{day.sunset}</strong></p>
                <p>Chance of Rain: <strong>{day.chance_of_rain}%</strong></p>
                <img src={day.conditions_icon} alt='Weather Icon' />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    </main>
  );
};

export default MyLocations;



