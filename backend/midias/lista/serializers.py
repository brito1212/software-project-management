from midia.models import Midia
from .models import Lista
from rest_framework import serializers
from midia.serializers import MidiaSerializer


class ListaSerializerRead(serializers.ModelSerializer):
    class MidiaSerializer(serializers.ModelSerializer):
        class Meta:
            model = Midia
            fields = ['id', 'title', 'banner']

    midias = MidiaSerializer(many=True)

    class Meta:
        model = Lista
        fields = "__all__"


class ListaSerializer(serializers.ModelSerializer):
    midias = MidiaSerializer(many=True, read_only=True)
    class Meta:
        model = Lista
        fields = "__all__"

class ListaSerializerUpdate(serializers.ModelSerializer):
    class Meta:
        model = Lista
        fields = "__all__"