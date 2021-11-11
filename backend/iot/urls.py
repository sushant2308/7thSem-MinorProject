from django.urls import path
from . import views


app_name = 'iot'

urlpatterns = [

    path('create_new_reading/', views.create_readings, name='create_new_readings'),
    path('get_readings/<slug:slug>/', views.get_readings, name='get_readings'),
    path('update_readings/<slug:slug>/', views.update_readings, name='update_readings'),
    
]
