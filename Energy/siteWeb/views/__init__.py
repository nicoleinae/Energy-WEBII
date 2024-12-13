from .templates import (
    index_view,
    home_view,
    
)

from .views import UserRegisterAPIView, UserView, UsuarioReadUpdateDeleteView, ConsultaView, ConsultaReadDeleteView

__all__ = [
    "index_view",
    "home_view",
    
    "UserRegisterAPIView",
    "UserView",
    "UsuarioReadUpdateDeleteView",
    "ConsultaView",
    "ConsultaReadDeleteView",
]