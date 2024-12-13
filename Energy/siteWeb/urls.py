from django.urls import path
from .views import (UserView, UsuarioReadUpdateDeleteView, ConsultaView, ConsultaReadDeleteView, UserRegisterAPIView)
from .views.templates import index_view, home_view, historico_view
from .views.views import ConsultaHistoricoView
from django.contrib.auth import views as auth_views
from rest_framework.authtoken.views import obtain_auth_token

urlpatterns = [
    #Django front-end
    path('usuario/', UserView.as_view()),
    path('usuario/<int:pk>/', UsuarioReadUpdateDeleteView.as_view(), name='usuario-detail'),
    path('consulta/', ConsultaView.as_view()),
    path('consulta/<int:pk>/', ConsultaReadDeleteView.as_view(), name='consulta-detail'),
    path('auth/', obtain_auth_token, name='api_token_auth'),
    path('register/', UserRegisterAPIView.as_view(), name='user-register'),
    path('historico/', ConsultaHistoricoView.as_view(), name='historico'),

    # URLs de login/logout
    path('login/', auth_views.LoginView.as_view(), name='login'),
    path('logout/', auth_views.LogoutView.as_view(), name='logout'),  # URL de logout

    #Front-end personalizado
    path('', index_view, name='home_login'),
    path('home/', home_view, name='home'),
    path('history/', historico_view, name='history'),
]