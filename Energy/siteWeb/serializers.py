from rest_framework import serializers
from .models import Usuario, Consulta

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = ['id', 'nome', 'email', 'senha']
                
class ConsultaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Consulta
        fields = 'id', 'data', 'cep', 'valorContaLuz', 'ajusteTarifa', 'tipoImovel', 'usuário'
        
class ConsultaReadDeleteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Consulta
        fields = '__all__'