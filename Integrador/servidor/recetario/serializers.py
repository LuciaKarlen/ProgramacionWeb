# recetario/serializers.py
from rest_framework import serializers
from .models import TipoReceta, Ingrediente, Receta, RecetaIngrediente

class TipoRecetaSerializer(serializers.ModelSerializer):
    class Meta:
        model = TipoReceta
        fields = '__all__'

class IngredienteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ingrediente
        fields = '__all__'

class RecetaIngredienteSerializer(serializers.ModelSerializer):
    class Meta:
        model = RecetaIngrediente
        fields = '__all__'

class RecetaSerializer(serializers.ModelSerializer):

    class Meta:
        model = Receta
        fields = '__all__'

