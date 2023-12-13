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

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Show loading while waiting for the API response
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
    <div className='container mt-4'>
      <form onSubmit={handleSubmit}>
        <div className='mb-3'>
          <label htmlFor='city' className='form-label'>
            Enter City:
          </label>
          <input
            type='text'
            className='form-control'
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
            <div className='card shadow-0 border card-body p-4'>
            <h4 className='mb-1 sfw-normal'>{day.name}, {day.region}</h4>
            <p className='mb-2'>Forecast Date: <strong>{day.date}</strong></p>
            <p className='mb-2'>Max Temperature: <strong>{day.max_temp_f}°F</strong></p>
            <p className='mb-2'>Min Temperature: <strong>{day.min_temp_f}°F</strong></p>
            <p>Conditions: <strong>{day.conditions_text}</strong></p>
            <p>Sunrise: <strong>{day.sunrise}</strong></p>
            <p>Sunset: <strong>{day.sunset}</strong></p>
            <p>Chance of Rain: <strong>{day.chance_of_rain}</strong></p>
            <img src={day.conditions_icon} alt='Weather Icon' />
          </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyLocations;



// function MyLocations() {
//   const [city, setCity] = useState('');
//   const [weatherdata, setWeatherdata] = useState([]);
//   const [isButtonClicked, setIsButtonClicked] = useState(false);
//   const [backgroundImage, setBackgroundImage] = useState(backgroundImages[0]);

//   const handleCityChange = (e) => {
//     setCity(e.target.value);
//   };

//   const handleClick = () => {
//     setIsButtonClicked(!isButtonClicked);
//   };

//   const shuffleBackgroundImage = () => {
//     const shuffledImages = [...backgroundImages];
//     shuffledImages.sort(() => Math.random() - 0.5);
//     setBackgroundImage(shuffledImages[0]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (isButtonClicked) {
//       const context = city;
//       const weather = await myWeatherInformation(context);
//       setWeatherdata(weather);
//       shuffleBackgroundImage(); // Change background image on weather update

//       if (!weather) {
//         alert(`Oops something went wrong. Try that again`);
//       }
//       setCity('');
//     }
//   };

//   return (
//     <main className='mt-4' style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: '70%', backgroundRepeat: 'center' }}>
//       <div className='container'>
//         {/* Latest Products */}
//         <div className='row mb-4'>
//           <div className='col-12 col-md-8 col-lg-6 col-xl-4'>
//             <form onSubmit={handleSubmit}>
//               <h3 className='mb-4 pb-2 fw-normal'>Check the weather forecast</h3>
//               <div className='input-group rounded mb-3'>
//                 <input
//                   type='text'
//                   className='form-control'
//                   id='city'
//                   name='city'
//                   value={city}
//                   onChange={handleCityChange}
//                   aria-label='Search'
//                   aria-describedby='search-addon'
//                 />
//                 <button className='btn btn-primary ms-1' onClick={handleClick}>
//                   Check!
//                 </button>
//               </div>
//             </form>
//             <div className='row'>
//               {weatherdata.map((forecast) => (
//                 <div key={forecast.date} className='col-md-6 mb-4'>
//                   <MyLocationsData forecast={forecast} />
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//         {/* End Latest Products */}
//       </div>
//     </main>
//   );
// }

// export default MyLocations;





// function MyLocations() {
//   const [location, setLocation] = useState('');
//   const [forecastData, setForecastData] = useState([]);

//   const handleLocationChange = (e) => {
//     setLocation(e.target.value);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Make API call
//     try {
//       const weather = await myWeatherInformation(location);
//       setForecastData(weather);
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   };

//   return (
//     <div className='container mt-4'>
//       <form onSubmit={handleSubmit}>
//         <div className='mb-3'>
//           <label htmlFor='location' className='form-label'>
//             Enter City or Zip Code:
//           </label>
//           <input
//             type='text'
//             className='form-control'
//             id='location'
//             value={location}
//             onChange={handleLocationChange}
//           />
//         </div>
//         <button type='submit' className='btn btn-primary'>
//           Check Forecast
//         </button>
//       </form>
//       <div className="row mb-4">
//             {forecastData.map((weather) => (
//               <MyLocationsData key={weather.date} weather={weather} />
//             ))}
//           </div>
//     </div>
//   );
// }

// export default MyLocations;

// function MyLocations() {
//   const [city, setCity] = useState('');
//   const [forecastData, setForecastData] = useState([]);
//   const [isButtonClicked, setIsButtonClicked] = useState(false);
//   const [backgroundImage, setBackgroundImage] = useState(backgroundImages[0]);

//   const handleCityChange = (e) => {
//     setCity(e.target.value);
//   };

//   const handleClick = () => {
//     setIsButtonClicked(!isButtonClicked);
//   };

//   const shuffleBackgroundImage = () => {
//     const shuffledImages = [...backgroundImages];
//     shuffledImages.sort(() => Math.random() - 0.5);
//     setBackgroundImage(shuffledImages[0]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (isButtonClicked) {
//       // Make API call for forecast data based on the entered city
//       // Assume there's a function called 'forecastInformation' that makes the API call
//       const forecast = await myWeatherInformation(city);

//       setForecastData(forecast);
//       shuffleBackgroundImage(); // Change background image on forecast update

//       if (!forecast) {
//         alert(`Oops something went wrong. Try that again`);
//       }
//       setCity('');
//     }
//   };

//   return (
//     <main className='mt-4' style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: '70%', backgroundRepeat: 'center' }}>
//       <div className='container'>
//         <div className='row mb-4'>
//           <div className='col-12 col-md-3 mb-4'>
//             <section className='vh-100'>
//               <div className='container py-5 h-100'>
//                 <form onSubmit={handleSubmit}>
//                   <div className='row d-flex justify-content-center align-items-center h-100'>
//                     <div className='col-md-8 col-lg-6 col-xl-4'>
//                       <h3 className='mb-4 pb-2 fw-normal'>Check the weather forecast</h3>
//                       <div className='input-group rounded mb-3'>
//                         <input
//                           type='text'
//                           className='form-control'
//                           id='city'
//                           name='city'
//                           value={city}
//                           onChange={handleCityChange}
//                           aria-label='Search'
//                           aria-describedby='search-addon'
//                         />
//                         <a href='#!' type='button'>
//                           <button className='btn btn-primary ms-1' onClick={handleClick}>
//                             Check!
//                           </button>
//                         </a>
//                       </div>
//                       <div className='row mb-4'>
//                       {forecastData.map((location) => (
//               <MyLocationsData key={location.name} location={location} />
//             ))}
//             </div>
//                     </div>
//                   </div>
//                 </form>
//               </div>
//             </section>
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// }

// export default MyLocations;

// function MyLocations(){

//   const [WeatherData, setWeatherData] = useState([]);
//   const base_url = import.meta.env.VITE_BASE_URL
//      useEffect(() => {
//        const getCityData = async () => {
//             const body = await myWeatherInformation()
//             // const dataArray = Object.values(body);
//             setWeatherData(body)
//             console.log(body)

//           }
//         getCityData();
//      },[]);

//     return (
//         <div className='container'>
//           <div className='row mb-4'>
//           {
//              WeatherData.map((data) => <MyLocationsData key={data.city} data={data}/>)
//             }
//           </div>
//           </div>
//     );

//         };

// export default MyLocations;