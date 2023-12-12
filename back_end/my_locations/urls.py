from django.urls import path
from . import views

urlpatterns = [
path('locations/', views.MyLocationsAPIView.as_view(), name='my_locations'),
path('location/delete/', views.LocationDeletionView.as_view(), name='location-delete'),
]