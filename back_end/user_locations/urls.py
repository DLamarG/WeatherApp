from . import views
from django.urls import path


urlpatterns = [
    # Vendors
    path('locations/', views.LocationList.as_view()),
]