from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from django.shortcuts import get_object_or_404, render
from django.contrib.auth.decorators import login_required

from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth import login, authenticate
from django.shortcuts import redirect

from ..models import Usuario, Consulta
from ..serializers import UsuarioSerializer, ConsultaSerializer, ConsultaReadDeleteSerializer, UserSerializer
from rest_framework.authtoken.models import Token
from rest_framework.response import Response

from ..serializers import ConsultaReadDeleteSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework import generics

def custom_login(request):
    if request.method == 'POST':
        form = AuthenticationForm(request, data=request.POST)
        if form.is_valid():
            user = form.get_user()
            login(request, user)
            return redirect('home')  # Redireciona para a home após login bem-sucedido
    else:
        form = AuthenticationForm()
    return render(request, 'login.html', {'form': form})

class UserRegisterAPIView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            # Cria o token para o novo usuário
            token, created = Token.objects.get_or_create(user=user)
            return Response({"user": serializer.data, "token": token.key}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UsuarioView(APIView):
    permission_classes = [AllowAny]

    #define as ações quando recebe um requisicao do tipo post
    def post(self, request):

        #instancia o serialize com os dados recebidos no 'request'
        serializer = UsuarioSerializer(data=request.data)
        if serializer.is_valid():

            #se o formato recebido estiver correto, salva os dados no banco de dados
            serializer.save()

            #retorna com o codigo 201 e os dados do serializer
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        #se o serializer não for valido, retorna erro 400
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request):
        usuarios = Usuario.objects.all()
        serializer = UsuarioSerializer(usuarios, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class UsuarioReadUpdateDeleteView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, pk):
        usuario = get_object_or_404(Usuario, pk=pk)

        serializer = UsuarioSerializer(usuario)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request, pk):
        usuario = get_object_or_404(Usuario, pk=pk)
        serializer = UsuarioSerializer(usuario, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        usuario = get_object_or_404(Usuario, pk=pk)
        usuario.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

#Consultas

class ConsultaView(APIView):
    permission_classes = [AllowAny]
    #define as ações quando recebe um requisicao do tipo post
    def post(self, request):

        #instancia o serialize com os dados recebidos no 'request'
        serializer = ConsultaSerializer(data=request.data)
        if serializer.is_valid():

            #se o formato recebido estiver correto, salva os dados no banco de dados
            serializer.save()

            #retorna com o codigo 201 e os dados do serializer
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        #se o serializer não for valido, retorna erro 400
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request):
        consultas = Consulta.objects.all()
        serializer = ConsultaSerializer(consultas, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class ConsultaReadDeleteView(APIView):

    def get(self, request, pk):
        consulta = get_object_or_404(Consulta, pk=pk)

        serializer = ConsultaReadDeleteSerializer(consulta)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def delete(self, request, pk):
        consulta = get_object_or_404(Consulta, pk=pk)
        consulta.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
class ConsultaHistoricoView(generics.ListAPIView):
    serializer_class = ConsultaReadDeleteSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Retorna as consultas do usuário logado
        return Consulta.objects.filter(usuario=self.request.user)
    
@login_required
def historico_view(request):
    consultas = Consulta.objects.filter(usuario=request.user)
    return render(request, 'history.html', {'consultas': consultas})