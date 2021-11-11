
from rest_framework import fields, serializers
from .models import Readings,Device

class ReadingsSerializer(serializers.ModelSerializer):
    class Meta:
        model=Readings
        fields=('date','voltage_r_in','voltage_r_out','current_r_in','voltage_y_in','voltage_y_out','current_y_in','voltage_b_in','voltage_b_out','current_b_in',)

class DeviceSerializer(serializers.ModelSerializer):

    readings=ReadingsSerializer(many=True)
    class Meta:
        model=Device
        fields = ('id','readings')