from django.urls import path
from .views import UsuarioView, UsuarioReadUpdateDeleteView

urlpatterns = [
    path('usuario/', UsuarioView.as_view()),
    path('usuario/<int:pk>/', UsuarioReadUpdateDeleteView.as_view(), name='professor-detail'),

]