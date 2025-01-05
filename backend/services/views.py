from django.shortcuts import render
from rest_framework import generics
from .models import Service
from .serializers import ServiceSerializer

# Create your views here.

class ServiceList(generics.ListAPIView):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer

class ServiceDetail(generics.RetrieveAPIView):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer
