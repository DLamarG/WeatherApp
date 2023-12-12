from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.response import Response
from rest_framework import status
from user_account.models import UserAccount
from user_locations.serializers import LocationSerializer
import requests
import os


class WeatherData(APIView):
    
    def get(self, request, city):
        city = city
        key = os.getenv("API_KEY")
        response = requests.get(f'https://api.weatherapi.com/v1/current.json?key=bdc8508933d24755843214116231112&q={city}&aqi=no')
        data = response.json()
       

        return Response(data, status=status.HTTP_200_OK)
    


class WeatherDataAPIView(APIView):

    def get(self, request):
        # Get the user token from the Authorization header
        user_token = request.headers.get('Authorization', '').split(' ')[1]  # Assuming the token is in the "Bearer" format

        # Make the API call to get locations
        locations_url = 'http://localhost:8000/api/v2/locations/'
        headers = {'Authorization': f'Token {user_token}'}
        
        try:
            response = requests.get(locations_url, headers=headers)

            if response:
                locations_data = response.json()
                weather_data = []

                # Make separate API calls for each location
                for location in locations_data:
                    zipcode = location['zipcode']
                    key = os.getenv("API_KEY")
                    
                    # Make API call for each location to the weather API
                    weather_url = f'https://api.weatherapi.com/v1/current.json?key=bdc8508933d24755843214116231112&q={zipcode}&aqi=no'
                    weather_response = requests.get(weather_url)

                    if weather_response.status_code == 200:
                        weather_info = weather_response.json()['current']
                        location_info = weather_response.json()['location']

                        # Extract required information
                        weather_object = {
                            'city': location_info['name'],
                            'state': location_info['region'],
                            'weather_description': weather_info['condition']['text'],
                            'feels_like_f': weather_info['feelslike_f'],
                            'weather_icon': weather_info['condition']['icon'],
                            'temperature_f': weather_info['temp_f'],
                            'humidity': weather_info['humidity'],
                            'wind_speed': weather_info['wind_mph']
                        }

                        weather_data.append(weather_object)
                    else:
                        # Handle API call error for weather API
                        weather_data.append({'error': f'Failed to retrieve weather data for {location["location"]}, {zipcode}'})

                # Return the aggregated weather data
                return Response(weather_data, status=status.HTTP_200_OK)
            else:
                return Response({'error': 'Failed to fetch locations data.'}, status=response.status_code)

        except requests.RequestException as e:
            return Response({'error': f'Failed to fetch data from {locations_url}: {str(e)}'}, status=500)



# class WeatherDataAPIView(APIView):
#     def get(self, request):
#         # Get the user token from the Authorization header
#         user_token = request.headers.get('Authorization', '').split(' ')[1]  # Assuming the token is in the "Bearer" format

#         # Make the API call to get locations
#         locations_url = 'http://localhost:8000/api/v2/locations/'
#         headers = {'Authorization': f'Token {user_token}'}
        
#         try:
#             response = requests.get(locations_url, headers=headers)

#             if response.status_code == 200:
#                 locations_data = response.json()
#                 weather_data = []

#                 # Make separate API calls for each location
#                 for location in locations_data:
#                     city = location['location']
#                     zipcode = location['zipcode']
#                     key = os.getenv("API_KEY")
#                     units = 'f'
#                     # Make API call for each location to the weather API
#                     weather_url = f'http://api.weatherstack.com/current?access_key={key}&query={city},{zipcode}&units={units}'
#                     weather_response = requests.get(weather_url)

#                     if weather_response.status_code == 200:
#                         weather_data.append(weather_response.json())
#                     else:
#                         # Handle API call error for weather API
#                         weather_data.append({'error': f'Failed to retrieve weather data for {city}, {zipcode}'})

#                 # Return the aggregated weather data
#                 return Response(weather_data, status=status.HTTP_200_OK)
#             else:
#                 return Response({'error': 'Failed to fetch locations data.'}, status=response.status_code)

#         except requests.RequestException as e:
#             return Response({'error': f'Failed to fetch data from {locations_url}: {str(e)}'}, status=500)




