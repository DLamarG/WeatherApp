import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';



function MyLocationsData(props) {
        const { location, current } = props.data; // Destructure the properties
      
        return (
          <main className='mt-4'>
            <div className='container'>
              <div className='row mb-4'>
                <div className='col-12 col-md-3 mb-4'>
                  <section className="vh-100">
                    <div className="container py-5 h-100">
                      <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-md-8 col-lg-6 col-xl-4">
                          <div className='card shadow-0 border'>
                            <div className='card-body p-4'>
                              <h4 className='mb-1 sfw-normal'>{location.name}</h4>
                              <p className='mb-2'>Current temperature: <strong>{current.temperature}°C</strong></p>
                              <p>Feels like: <strong>{current.feelslike}°C</strong></p>
                              <p>Max: <strong>{current.temperature}°C</strong>, Min: <strong>{current.temperature}°C</strong></p>
                              <div className='d-flex flex-row align-items-center'>
                                <p className='mb-0 me-4'>{current.weather_descriptions.join(', ')}</p>
                                <img src={current.weather_icons[0]} alt="Weather Icon" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </main>
        );
      }
      
      export default MyLocationsData;
  
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
//                               <h4 className='mb-1 sfw-normal'>{props.location.name}</h4>
//                               <p className='mb-2'>Current temperature: <strong>{props.current.temperature}°C</strong></p>
//                               <p>Feels like: <strong>{props.current.feelslike}°C</strong></p>
//                               <p>Max: <strong>{props.current.temperature}°C</strong>, Min: <strong>{props.current.temperature}°C</strong></p>
//                               <div className='d-flex flex-row align-items-center'>
//                                 <p className='mb-0 me-4'>{props.current.weather_descriptions.join(', ')}</p>
//                                 <img src={props.current.weather_icons[0]} />
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