from rest_framework import serializers

class LocationDeletionSerializer(serializers.Serializer):
    location_id = serializers.IntegerField()