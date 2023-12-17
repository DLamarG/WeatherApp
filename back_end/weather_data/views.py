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
    




class WeatherForecastAPIView(APIView):
    def get(self, request, city):
        # Make API call for the given city to the weather API
        weather_url = f'https://api.weatherapi.com/v1/forecast.json?key=bdc8508933d24755843214116231112&q={city}&days=3&aqi=no&alerts=no'
        weather_response = requests.get(weather_url)

        if weather_response.status_code == 200:
            weather_data = weather_response.json()
            forecast_days = weather_data['forecast']['forecastday']
            location_data = weather_data['location']

            # Define the target time (12:00 PM)
            target_time = "12:00 PM"

            # Extract and format forecast data for all three days
            formatted_forecast = []
            for forecast_day in forecast_days:
                # Find the closest entry to the target time
                closest_entry = min(forecast_day['hour'], key=lambda x: abs(int(x['time'].split()[1].split(':')[0]) - 12))

                noon_info = {
                    'name': location_data['name'],
                    'region': location_data['region'],
                    'date': forecast_day['date'],
                    'max_temp_f': closest_entry['temp_f'],
                    'min_temp_f': closest_entry['temp_f'],
                    'conditions_text': closest_entry['condition']['text'],
                    'conditions_icon': closest_entry['condition']['icon'],
                    'sunrise': forecast_day['astro']['sunrise'],
                    'sunset': forecast_day['astro']['sunset'],
                    'chance_of_rain': forecast_day['day']['daily_chance_of_rain']
                }
                formatted_forecast.append(noon_info)

            # Return the formatted forecast data for all three days
            return Response(formatted_forecast, status=status.HTTP_200_OK)
        else:
            # Handle API call error for weather API
            return Response({'error': f'Failed to retrieve weather data for {city}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)





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




