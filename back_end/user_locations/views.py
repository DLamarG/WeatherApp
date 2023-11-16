from . import serializers
from rest_framework import generics
from . import models


# Create your views here.
class LocationList(generics.ListCreateAPIView):
    queryset=models.Location.objects.all()
    serializer_class=serializers.LocationSerializer