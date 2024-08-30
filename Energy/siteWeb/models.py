from django.db import models

class Usuario(models.Model):
    nome = models.CharField(max_length=200, null=False)
    email = models.CharField(max_length=200, unique=True)
    senha = models.CharField(null=False, max_length=40)

    def __str__(self):
        return self.nome