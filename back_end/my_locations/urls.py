from django.urls import path
from . import views

urlpatterns = [
path('locations/', views.MyLocationsAPIView.as_view(), name='my_locations'),
path('locations/<int:location_id>/', views.MyLocationsAPIView.as_view(), name='delete_my_location'),
path('location/delete/', views.LocationDeletionView.as_view(), name='location-delete'),
]