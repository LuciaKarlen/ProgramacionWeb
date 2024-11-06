# api/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TipoRecetaViewSet, IngredienteViewSet, RecetaViewSet, RecetaIngredienteViewSet

router = DefaultRouter()
router.register(r'tipos', TipoRecetaViewSet)
router.register(r'ingredientes', IngredienteViewSet)
router.register(r'recetas', RecetaViewSet)
router.register(r'receta-ingredientes', RecetaIngredienteViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
