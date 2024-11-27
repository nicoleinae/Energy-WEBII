from .templates import (
    index_view,
    home_view,
    
)

from .views import UserRegisterAPIView, UsuarioView, UsuarioReadUpdateDeleteView, ConsultaView, ConsultaReadDeleteView

__all__ = [
    "index_view",
    "home_view",
    
    "UserRegisterAPIView",
    "UsuarioView",
    "UsuarioReadUpdateDeleteView",
    "ConsultaView",
    "ConsultaReadDeleteView",
]