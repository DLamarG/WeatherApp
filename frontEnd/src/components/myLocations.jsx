import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react';
import { myWeatherInformation } from '../api';
import MyLocationsData from './myLocations';


function MyLocations(){

  const [WeatherData, setWeatherData] = useState([]);
  const base_url = import.meta.env.VITE_BASE_URL
     useEffect(() => {
       const getCityData = async () => {
            const body = myWeatherInformation()
            const dataArray = Object.values(body);
            setWeatherData(dataArray)
            console.log(dataArray)

          }
        getCityData();
     },[]);

    return (
        <div className='container'>
          <div className='row mb-4'>
          {
             WeatherData.map((data) => <MyLocationsData key={data.location.name} data={data}/>)
            }
          </div>
          </div>
    );

        };

export default MyLocations;