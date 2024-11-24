from midia.models import Midia
from .models import Lista
from rest_framework import serializers
from midia.serializers import MidiaSerializer


class ListaSerializerRead(serializers.ModelSerializer):
    class MidiaSerializer(serializers.ModelSerializer):
        class Meta:
            model = Midia
            fields = ['id', 'title', 'banner', "media_type"]

    midias = MidiaSerializer(many=True)

    class Meta:
        model = Lista
        fields = "__all__"


class ListaSerializer(serializers.ModelSerializer):
    midias = MidiaSerializer(many=True, read_only=True, required=False)
    class Meta:
        model = Lista
        fields = "__all__"

class ListaSerializerUpdate(serializers.ModelSerializer):
    midias = serializers.PrimaryKeyRelatedField(
        many=True, 
        queryset=Midia.objects.all(), 
        required=False  # Permite que o campo seja omitido ou vazio
    )
    class Meta:
        model = Lista
        fields = "__all__"
    def update(self, instance, validated_data):
        midias_data = validated_data.pop('midias', None)

        if midias_data is not None:
            instance.midias.set(midias_data)

        return super().update(instance, validated_data)