import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';



function MyLocationsData({ forecast }) {
  return (
    <div className='card shadow-0 border'>
      <div className='card-body p-4'>
        <h4 className='mb-1 sfw-normal'>{forecast.name}, {forecast.region}</h4>
        <p className='mb-2'>Forecast Date: <strong>{forecast.date}</strong></p>
        <p className='mb-2'>Max Temperature: <strong>{forecast.max_temp_f}°F</strong></p>
        <p className='mb-2'>Min Temperature: <strong>{forecast.min_temp_f}°F</strong></p>
        <p>Conditions: <strong>{forecast.conditions_text}</strong></p>
        <p>Sunrise: <strong>{forecast.sunrise}</strong></p>
        <p>Sunset: <strong>{forecast.sunset}</strong></p>
        <p>Chance of Rain: <strong>{forecast.chance_of_rain}</strong></p>
        <img src={forecast.conditions_icon} alt='Weather Icon' />
      </div>
    </div>
  );
}

export default MyLocationsData;



// function MyLocationsData(props){
  
//     return (
//         <main className='mt-4'>
//         <div className='container'>
          
//           <div className='row mb-4'>
//           <div classNameName='col-12 col-md-3 mb-4'>
//             <section className="vh-100">
//         <div className="container py-5 h-100">
//             <div className="row d-flex justify-content-center align-items-center h-100">
//             <div className="col-md-8 col-lg-6 col-xl-4">
//                           <div className='card shadow-0 border'>
//                             <div className='card-body p-4'>
//                               <h4 className='mb-1 sfw-normal'>{props.city}, {props.state}</h4>
//                               <p className='mb-2'>Current temperature: <strong>{props.temperature_f}°F</strong></p>
//                               <p className='mb-2'>Current humidity: <strong>{props.humidity}</strong></p>
//                               <p>Feels like: <strong>{props.feelslike_f}°F</strong></p>
//                               <p>Wind: <strong>{props.wind_speed}mph</strong></p>
//                               <div className='d-flex flex-row align-items-center'>
//                                 <p className='mb-0 me-4'>{props.weather_description}</p>
//                                 <img src={props.weather_icon} />
//                               </div>
//                             </div>
//                           </div>
//                             </div>
//                           </div>
//                         </div>
//                       </section>
//                     </div>
//                       </div>
//                       {/* End Latest Products */}
//                     </div>
//                   </main>
//     );
// };

// export default MyLocationsData;