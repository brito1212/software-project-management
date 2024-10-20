from .models import Lista
from rest_framework import serializers
from midia.serializers import MidiaSerializer


class ListaSerializer(serializers.ModelSerializer):
    midias = MidiaSerializer(many=True, read_only=True)
    class Meta:
        model = Lista
        fields = "__all__"
