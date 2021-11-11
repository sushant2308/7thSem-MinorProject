
from .serializers import ReadingsSerializer,DeviceSerializer
from .models import Readings,Device
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status


@api_view(['GET', ])
def create_readings(request):
    device = Device()
    device.save()

    return Response({'id': device.id}, status=status.HTTP_201_CREATED) 

@api_view(['GET', ])
def get_readings(request,slug):
    device=Device.objects.get(id=slug)
    serializer=DeviceSerializer(device)

    return Response(serializer.data)

@api_view(['POST', ])
def update_readings(request,slug):
    device=Device.objects.get(id=slug)
    serializer=ReadingsSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(device=device)
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST) 
  