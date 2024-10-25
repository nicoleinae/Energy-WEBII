from django.urls import path
from .views import (
    UsuarioView, 
    UsuarioReadUpdateDeleteView, 
    ConsultaView, 
    ConsultaReadDeleteView
)

urlpatterns = [
    path('usuario/', UsuarioView.as_view()),
    path('usuario/<int:pk>/', UsuarioReadUpdateDeleteView.as_view(), name='usuario-detail'),

    path('consulta/', ConsultaView.as_view()),
    path('consulta/<int:pk>/', ConsultaReadDeleteView.as_view(), name='consulta-detail'),
]