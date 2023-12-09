

export async function basicFetch(url, payload) {
    const res = await fetch(url, payload)
    const body = await res.json()
    console.log(body)
    return body
  }


  export async function register(context) {
    const payload = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify(context)
      }
      const body = await basicFetch(`http://localhost:8000/api/v1/signup/`,payload)
      console.log(body, "API CALL")
      return body
    }
    
  export async function login(context) {
    const payload = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(context)
    }
    const body = await basicFetch(`http://localhost:8000/api/v1/get-token/`, payload)
    localStorage.setItem("token", body.token)
    return body.token
  }

  export async function weatherInformation(city){
    city = city
    const API_URL = 'http://localhost:8000/api/v4/location_data/';
    const userToken = localStorage.getItem("token")
    const payload = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${userToken}`
      },
    }
    const weatherData = await basicFetch(`${API_URL}+${city}/`, payload)
    return weatherData

  }
  

  export async function myWeatherInformation(){
    const API_URL = 'http://localhost:8000/api/v4/user_location_data/';
    const userToken = localStorage.getItem("token")
    const payload = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${userToken}`
      },
    }
    const body = await basicFetch(`${API_URL}`, payload)
    return body
  }

  
  export async function addLocation(context) {
    const userToken = localStorage.getItem("token")
    const payload = {
      method: "POST",
      headers: {
        "Authorization": `Token ${userToken}`
      },
      body: context
    }
    const body = await basicFetch(`http://localhost:8000/api/v3/locations/`, payload)
    console.log(body)
    return {"success": "Your new location has been added!"}
  }