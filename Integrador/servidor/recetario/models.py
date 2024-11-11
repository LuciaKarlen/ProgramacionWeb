from django.db import models

class TipoReceta(models.Model):
    nombre = models.CharField(max_length=50)

    def __str__(self):
        return self.nombre

class Ingrediente(models.Model):
    nombre = models.CharField(max_length=50)

    def __str__(self):
        return self.nombre

class Receta(models.Model):
    titulo = models.CharField(max_length=100)
    descripcion = models.TextField(null=True, blank=True)
    tiempo = models.IntegerField()
    tipo = models.ForeignKey(TipoReceta, on_delete=models.CASCADE)
    pasos = models.TextField(null=True, blank=True)  # New field for steps

    def __str__(self):
        return self.titulo

class RecetaIngrediente(models.Model):
    receta = models.ForeignKey(Receta, on_delete=models.CASCADE)
    ingrediente = models.ForeignKey(Ingrediente, on_delete=models.CASCADE)
    cantidad = models.CharField(max_length=50)

    def __str__(self):
        return f"{self.ingrediente.nombre}: {self.cantidad}"