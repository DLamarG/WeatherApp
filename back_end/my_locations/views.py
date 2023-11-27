from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from user_account.models import UserAccount
from user_locations.models import Location
from user_locations.serializers import LocationSerializer
from user_locations.serializers import LocationSerializer


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
    
    




    # def delete(self, request, location_id):
    #     user = request.user
    #     location_id=location_id
        
    #     try:
    #         profile = UserAccount.objects.get(user=user)
    #         my_location = profile.my_locations.filter(location_id=location_id).first()

    #         if my_location:
    #             # Delete the recipe from the user's list
    #             profile.my_locations.remove(my_location)
    #             my_location.delete()

    #             return Response({'message': 'Location deleted.'}, status=status.HTTP_204_NO_CONTENT)
    #         else:
    #             return Response({'message': 'Location not found in the list.'}, status=status.HTTP_404_NOT_FOUND)

    #     except UserAccount.DoesNotExist:
    #         return Response({'message': 'User profile not found.'}, status=status.HTTP_404_NOT_FOUND)

    

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
            user_profile.my_locations.add_to_locations(new_location)
            return Response({'message': 'Location added successfully.'}, status=status.HTTP_201_CREATED)

        except UserAccount.DoesNotExist:
            return Response({'message': 'User profile not found.'}, status=status.HTTP_404_NOT_FOUND)
        

    def delete(self, request, location_id):
        user = request.user
        location_id = location_id

        try:
            profile = UserAccount.objects.get(user=user)
            location = profile.my_locations.filter(location_id=location_id).first()

            if location:
                # Delete the recipe from the user's list
                profile.my_locations.remove(location)
                location.delete()

                return Response({'message': 'Recipe deleted.'}, status=status.HTTP_204_NO_CONTENT)
            else:
                return Response({'message': 'Recipe not found in the list.'}, status=status.HTTP_404_NOT_FOUND)

        except UserAccount.DoesNotExist:
            return Response({'message': 'User profile not found.'}, status=status.HTTP_404_NOT_FOUND)


