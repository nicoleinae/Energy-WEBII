from django.shortcuts import render
from ..models import Usuario, Consulta

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

 # Views baseadas em funções (renderização)

def index_view(request):
    return render(request, 'index.html')

def home_view(request):
    return render(request, 'home.html')