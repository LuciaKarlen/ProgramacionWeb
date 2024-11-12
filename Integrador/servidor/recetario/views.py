from django.shortcuts import render

from rest_framework import viewsets, status
from rest_framework.exceptions import ValidationError
from rest_framework.response import Response

from .models import TipoReceta, Ingrediente, Receta, RecetaIngrediente
from .serializers import TipoRecetaSerializer, IngredienteSerializer, RecetaSerializer, RecetaIngredienteSerializer

class TipoRecetaViewSet(viewsets.ModelViewSet):
    queryset = TipoReceta.objects.all()
    serializer_class = TipoRecetaSerializer

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        if Receta.objects.filter(tipo=instance).exists():
            raise ValidationError('No se puede eliminar porque está asociado a una receta.')
        return super().destroy(request, *args, **kwargs)

class IngredienteViewSet(viewsets.ModelViewSet):
    queryset = Ingrediente.objects.all()
    serializer_class = IngredienteSerializer

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        if RecetaIngrediente.objects.filter(ingrediente=instance).exists():
            raise ValidationError('No se puede eliminar porque está asociado a una receta.')
        return super().destroy(request, *args, **kwargs)

class RecetaViewSet(viewsets.ModelViewSet):
    queryset = Receta.objects.all()
    serializer_class = RecetaSerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        titulo = self.request.query_params.get('titulo')
        tipo = self.request.query_params.get('tipo')
        ingrediente = self.request.query_params.get('ingrediente')

        if titulo:
            queryset = queryset.filter(titulo__icontains=titulo)
        if tipo:
            queryset = queryset.filter(tipo_id=tipo)
        if ingrediente:
            queryset = queryset.filter(recetaingrediente__ingrediente_id=ingrediente)

        return queryset

    def create(self, request, *args, **kwargs):
        data = request.data
        receta = Receta.objects.create(
            titulo=data.get('titulo'),
            descripcion=data.get('descripcion'),
            tiempo=data.get('tiempo'),
            tipo_id=data.get('tipo'),
            pasos=data.get('pasos')
        )
        for ri_data in data.get('recetaingredientes', []):
            RecetaIngrediente.objects.create(
                receta=receta,
                ingrediente_id=ri_data.get('ingrediente'),
                cantidad=ri_data.get('cantidad')
            )
        return Response({'id': receta.id}, status=status.HTTP_201_CREATED)


    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        data = request.data
        instance.titulo = data.get('titulo')
        instance.descripcion = data.get('descripcion')
        instance.tiempo = data.get('tiempo')
        instance.tipo_id = data.get('tipo')
        instance.pasos = data.get('pasos')
        instance.save()

        RecetaIngrediente.objects.filter(receta=instance).delete()
        for ri_data in data.get('recetaingredientes', []):
            RecetaIngrediente.objects.create(
                receta=instance,
                ingrediente_id=ri_data.get('ingrediente'),
                cantidad=ri_data.get('cantidad')
            )
        return Response(status=status.HTTP_204_NO_CONTENT)

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        recetaingredientes = RecetaIngrediente.objects.filter(receta=instance)
        serializer = self.get_serializer(instance)
        data = serializer.data
        data['recetaingredientes'] = RecetaIngredienteSerializer(recetaingredientes, many=True).data
        return Response(data)


class RecetaIngredienteViewSet(viewsets.ModelViewSet):
    queryset = RecetaIngrediente.objects.all()
    serializer_class = RecetaIngredienteSerializer
