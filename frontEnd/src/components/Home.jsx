import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { weatherInformation } from '../api';
import { useState } from 'react';
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
  image2
];

function Home() {
  const [city, setCity] = useState('');
  const [weatherdata, setWeatherdata] = useState('');
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [backgroundImage, setBackgroundImage] = useState(backgroundImages[0]);

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  const handleClick = () => {
    setIsButtonClicked(!isButtonClicked);
  };

  const shuffleBackgroundImage = () => {
    const shuffledImages = [...backgroundImages];
    shuffledImages.sort(() => Math.random()- 0.5);
    setBackgroundImage(shuffledImages[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isButtonClicked) {
      const context = city;
      const weather = await weatherInformation(context);
      setWeatherdata(weather);
      shuffleBackgroundImage(); // Change background image on weather update

      if (!weather) {
        alert(`Oops something went wrong. Try that again`);
      }
      setCity('');
    }
  };

  return (
    <main className='mt-4' style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: '70%', backgroundRepeat: 'center' }}>
      <div className='container'>
        {/* Latest Products */}
        <div className='row mb-4'>
          <div classNameName='col-12 col-md-3 mb-4'>
            <section className='vh-100'>
              <div className='container py-5 h-100'>
                <form onSubmit={handleSubmit}>
                  <div className='row d-flex justify-content-center align-items-center h-100'>
                    <div className='col-md-8 col-lg-6 col-xl-4'>
                      <h3 className='mb-4 pb-2 fw-normal'>Check the weather forecast</h3>
                      <div className='input-group rounded mb-3'>
                        <input
                          type='text'
                          className='form-control'
                          id='city'
                          name='city'
                          value={city}
                          onChange={handleCityChange}
                          aria-label='Search'
                          aria-describedby='search-addon'
                        />
                        <a href='#!' type='button'>
                          <button className='btn btn-primary ms-1' onClick={handleClick}>
                            Check!
                          </button>
                        </a>
                      </div>
                      {weatherdata && (
                        <div className='card shadow-0 border'>
                          <div className='card-body p-4'>
                            <h4 className='mb-1 sfw-normal'>
                              {weatherdata.location.name}, {weatherdata.location.region}
                            </h4>
                            <p className='mb-2'>
                              Current temperature: <strong>{weatherdata.current.temp_f}°C</strong>
                            </p>
                            <p className='mb-2'>
                              Current humidity: <strong>{weatherdata.current.humidity}°C</strong>
                            </p>
                            <p>
                              Feels like: <strong>{weatherdata.current.feelslike_f}°F</strong>
                            </p>
                            <p>
                              Wind: <strong>{weatherdata.current.wind_mph}mph</strong>, Direction:{' '}
                              <strong>{weatherdata.current.wind_dir}</strong>
                            </p>
                            <div className='d-flex flex-row align-items-center'>
                              <p className='mb-0 me-4'>{weatherdata.current.condition.text}</p>
                              {/* Replace the following icon with a dynamic one based on the weather */}
                              <img src={weatherdata.current.condition.icon} alt='Weather Icon' />
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
}

export default Home;



// function Home(){
//   const [city, setCity] = useState('');
//   const [weatherdata, setWeatherdata] = useState('');
//   const [isButtonClicked, setIsButtonClicked] = useState(false)


//     const handleCityChange = (e) => {
//     setCity(e.target.value);
//   };

//   const handleClick = () => {
//     setIsButtonClicked(!isButtonClicked)
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if(isButtonClicked){
//         const context = (city)
//         const weather = await weatherInformation(context)
//         setWeatherdata(weather)
//         console.log(weatherdata)
//         if(!weather)
//         alert(`Oops something went wrong. Try that again`);
//         setCity('');
//     }
//   }

//     return (
//         <main className='mt-4'>
//         <div className='container'>
//           {/* Latest Products */}
          
//           <div className='row mb-4'>
//           <div classNameName='col-12 col-md-3 mb-4'>
//             <section className="vh-100">
//         <div className="container py-5 h-100">
//         <form onSubmit={handleSubmit}>
//             <div className="row d-flex justify-content-center align-items-center h-100">
//             <div className="col-md-8 col-lg-6 col-xl-4">
               
//                 <h3 className="mb-4 pb-2 fw-normal">Check the weather forecast</h3>
                
//                 <div className="input-group rounded mb-3">
//                 <input 
//                 type="text" 
//                 className="form-control" 
//                 id="city" 
//                 name="city"
//                 value={city}
//                 onChange={handleCityChange}
//                 aria-label="Search"
//                 aria-describedby="search-addon" />
//                 <a href="#!" type="button">
//                     <button className="btn btn-primary ms-1" onClick={handleClick}>
//                     Check!
//                     </button>
//                 </a>
//                 </div>
//                   {weatherdata && (
//                           <div className='card shadow-0 border'>
//                             <div className='card-body p-4'>
//                               <h4 className='mb-1 sfw-normal'>{weatherdata.location.name}, {weatherdata.location.region}</h4>
//                               <p className='mb-2'>Current temperature: <strong>{weatherdata.current.temp_f}°C</strong></p>
//                               <p className='mb-2'>Current humidity: <strong>{weatherdata.current.humidity}°C</strong></p>
//                               <p>Feels like: <strong>{weatherdata.current.feelslike_f}°F</strong></p>
//                               <p>Wind: <strong>{weatherdata.current.wind_mph}mph</strong>, Direction: <strong>{weatherdata.current.wind_dir}</strong></p>
//                               <div className='d-flex flex-row align-items-center'>
//                                 <p className='mb-0 me-4'>{weatherdata.current.condition.text}</p>
//                                 {/* Replace the following icon with a dynamic one based on the weather */}
//                                 <img src={weatherdata.current.condition.icon} />
//                               </div>
//                             </div>
//                           </div>
//                       )}

//                             </div>
//                           </div>
//                           </form>
//                         </div>
//                       </section>
//                     </div>
//                       </div>
//                       {/* End Latest Products */}
//                     </div>
//                   </main>
//     );
// };

// export default Home;