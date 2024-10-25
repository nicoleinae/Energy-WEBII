from rest_framework import serializers
from .models import Usuario

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = ['id', 'nome', 'email', 'senha']
                
class ConsultaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = 'id', 'data', 'cep', 'valorContaLuz', 'ajusteTarifa', 'tipoImovel', 'usuário'
        
class ConsultaReadDeleteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = '__all__'