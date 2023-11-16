from django.db import models



# Location Models

class Location(models.Model):
    location_id = models.AutoField(primary_key=True)
    location = models.CharField(max_length=100, blank=False)


    def __str__(self):
        return self.location
