from django.db import models
from django.contrib.auth.models import User
from user_locations.models import Location



# Create your models here.
class UserAccount(models.Model):
    user=models.OneToOneField(User, on_delete=models.CASCADE)
    my_locations = models.ManyToManyField(Location, related_name='my_locations', blank=True)


    def add_to_locations(self, location):
        if not self.my_locations.filter(location=location).exists():
            location=Location.objects.create(location=location)
            self.my_locations.add(location)
            return {'message': 'location added to your locations'}
        else:
            return {'message': 'location already exist'}
        

    def __str__(self):
        return self.user.username