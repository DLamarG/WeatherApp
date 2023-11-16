from django.urls import path
from . import views

urlpatterns = [

path('locations/', views.MyLocatoinsAPIView.as_view(), name='my_locations'),
path('delete_location/<int:location_id>/', views.MyLocatoinsAPIView.as_view(), name='delete_my_location'),
]