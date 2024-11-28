from django.shortcuts import render
from django.contrib.auth.decorators import login_required


 # Views baseadas em funções (renderização)

def index_view(request):
    return render(request, 'index.html')

@login_required
def home_view(request):
    return render(request, 'home.html')