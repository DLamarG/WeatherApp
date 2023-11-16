from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.response import Response
from rest_framework import status
import requests
import os


class WeatherData(APIView):
    
    def get(self, request, city):
        city = city
        key = os.getenv("API_KEY")
        response = requests.get(f'http://api.weatherstack.com/current?access_key={key}&query={city}')
        data = response.json()
       

        return Response(data, status=status.HTTP_200_OK)
