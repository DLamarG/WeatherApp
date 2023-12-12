from django.db import models



# Location Models

class Location(models.Model):
    location_id = models.AutoField(primary_key=True)
    location = models.CharField(max_length=100, blank=False)
    zipcode = models.CharField(max_length=20, blank=False, default='00000')


    def __str__(self):
        return {self.location, self.zipcode}
