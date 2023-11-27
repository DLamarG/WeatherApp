from django.urls import path
from . import views

urlpatterns = [
path('location_data/<str:city>/', views.WeatherData.as_view(), name='city_weather'),
path('user_location_data/', views.WeatherDataAPIView.as_view(), name='detail_city_weather'),
]