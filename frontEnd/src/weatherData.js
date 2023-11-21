import axios from 'axios';

const API_URL = 'http://localhost:8000/api/v4/location_data/'; // Replace with your Django API URL

export async function fetchDataFromApi (city){
  try {
    const response = await axios.get(`${API_URL}${city}/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching data from API:', error);
    throw error;
  }
};

