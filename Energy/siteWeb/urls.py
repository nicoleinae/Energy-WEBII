from django.urls import path
from .views import (
    UsuarioView, 
    UsuarioReadUpdateDeleteView, 
    ConsultaView, 
    ConsultaReadDeleteView,
    UserRegisterAPIView
)
from rest_framework.authtoken.views import obtain_auth_token

urlpatterns = [
    path('usuario/', UsuarioView.as_view()),
    path('usuario/<int:pk>/', UsuarioReadUpdateDeleteView.as_view(), name='usuario-detail'),

    path('consulta/', ConsultaView.as_view()),
    path('consulta/<int:pk>/', ConsultaReadDeleteView.as_view(), name='consulta-detail'),

    path('auth/', obtain_auth_token, name='api_token_auth'),
    path('register/', UserRegisterAPIView.as_view(), name='user-register'),
]