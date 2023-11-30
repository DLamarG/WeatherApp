from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from user_account.models import UserAccount
from user_locations.models import Location
from user_locations.serializers import LocationSerializer
from user_locations.serializers import LocationSerializer
from .serializers import LocationDeletionSerializer
from rest_framework import generics, status


class MyLocationsAPIView(APIView):
    def get(self, request):
        user = request.user  # Get the currently logged-in user
        
        try:
            profile = UserAccount.objects.get(user=user)
            my_locations_list = profile.my_locations.all()  # Retrieve the user's cars from garage

     
            # Serialize the watchlist movies data
            serializer = LocationSerializer(my_locations_list, many=True)

            return Response(serializer.data, status=status.HTTP_200_OK)

        except UserAccount.DoesNotExist:
            return Response({'message': 'User profile not found.'}, status=status.HTTP_404_NOT_FOUND)

    

    def post(self, request):
        user = request.user
        location_data = request.data

        try:
            user_profile = UserAccount.objects.get(user=user)

            # Create a new Location instance
            new_location = Location.objects.create(
                location=location_data.get('location'),
                zipcode=location_data.get('zipcode')
            )

            # Add the location to the user's my_locations
            user_profile.my_locations.add(new_location)
            return Response({'message': 'Location added successfully.'}, status=status.HTTP_201_CREATED)

        except UserAccount.DoesNotExist:
            return Response({'message': 'User profile not found.'}, status=status.HTTP_404_NOT_FOUND)
        



class LocationDeletionView(generics.DestroyAPIView):
    queryset = UserAccount.objects.all()  # Adjust the queryset based on your needs
    serializer_class = LocationDeletionSerializer

    def delete(self, request, *args, **kwargs):
        user = request.user
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            location_id = serializer.validated_data['location_id']

            try:
                user_profile = UserAccount.objects.get(user=user)

                # Check if the location exists in the user's my_locations
                location_to_delete = user_profile.my_locations.filter(location_id=location_id).first()

                if location_to_delete:
                    # Remove the location from the user's my_locations
                    user_profile.my_locations.remove(location_to_delete)
                    return Response({'message': 'Location deleted successfully.'}, status=status.HTTP_204_NO_CONTENT)
                else:
                    return Response({'message': 'Location not found in user\'s locations.'}, status=status.HTTP_404_NOT_FOUND)

            except UserAccount.DoesNotExist:
                return Response({'message': 'User profile not found.'}, status=status.HTTP_404_NOT_FOUND)

        return Response({'message': 'Invalid data provided for location deletion.'}, status=status.HTTP_400_BAD_REQUEST)
