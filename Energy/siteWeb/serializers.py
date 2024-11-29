from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Usuario, Consulta

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, style={'input_type': 'password'})

    class Meta:
        model = User
        fields = ['username', 'email', 'password']

    def create(self, validated_data):
        # Cria o usuário com o método `create_user` para garantir o hash da senha
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = ['nome', 'email', 'senha']
                
class ConsultaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Consulta
        fields = ['data', 'cep', 'valorContaLuz', 'ajusteTarifa', 'tipoImovel', 'usuário']
        
class ConsultaReadDeleteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Consulta
        fields = '__all__'