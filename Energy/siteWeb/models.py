from django.db import models
from django.contrib.auth.models import User

class Consulta(models.Model):
    TIPOS_IMOVEL = [
        ("R", "Residencial"),
        ("E", "Empresarial"),
    ]

    data = models.DateField(null=False)
    cep = models.CharField(max_length=8, null=False)  
    valorContaLuz = models.DecimalField(max_digits=10, decimal_places=2, null=False)
    ajusteTarifa = models.DecimalField(max_digits=10, decimal_places=2, null=False)
    tipoImovel = models.CharField(max_length=1, choices=TIPOS_IMOVEL, null=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return f"Consulta {self.id} - {self.tipoImovel} em {self.data}"