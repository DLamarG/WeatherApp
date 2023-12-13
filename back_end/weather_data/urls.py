from django.urls import path
from . import views

urlpatterns = [
path('location_data/<str:city>/', views.WeatherData.as_view(), name='city_weather'),
path('forecast_location_data/<str:city>/', views.WeatherForecastAPIView.as_view(), name='forecast_city_weather'),
]