from django.db import models
import uuid
from django.db.models.signals import post_save
from django.dispatch import receiver
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
from django.db.models.base import Model
# Create your models here.
class Device(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

class Readings(models.Model):
    device = models.ForeignKey(Device,on_delete=models.CASCADE,related_name='readings')
    voltage_r_in = models.IntegerField(default=0)
    voltage_r_out = models.IntegerField(default=0)
    current_r_in = models.IntegerField(default=0)
    voltage_y_in = models.IntegerField(default=0)
    voltage_y_out = models.IntegerField(default=0)
    current_y_in = models.IntegerField(default=0)
    voltage_b_in = models.IntegerField(default=0)
    voltage_b_out = models.IntegerField(default=0)
    current_b_in = models.IntegerField(default=0)
    date= models.DateTimeField(auto_now_add=True)



 
@receiver(post_save,sender=Readings)
def notify_new_post(sender,instance,created,**kwargs):
    print("triggerd")
    if created:
        channel_layer = get_channel_layer()
        async_to_sync(channel_layer.group_send)(
            group='dashboard',#the group/room that will receive the broadcast
            message= {
                'type':"dashboard.message",
            }
        )

  