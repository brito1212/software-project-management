from .models import Game, Genres, Midia, Movie, Platforms, Serie
from rest_framework import serializers

class GenresSerializer(serializers.Serializer):
    class Meta:
        model = Genres
        fields = ["id", "name"]

class PlatformSerializer(serializers.Serializer):
    class Meta:
        model = Platforms
        fields = ["name"]


class MidiaSerializer(serializers.ModelSerializer):
    genres = serializers.StringRelatedField(many=True, read_only=True)
    platforms = serializers.StringRelatedField(many=True, read_only=True)
    class Meta:
        model = Midia
        fields = "__all__"

class MovieSerializer(MidiaSerializer):
    class Meta(MidiaSerializer.Meta):
        model = Movie
        fields = "__all__"


class SerieSerializer(MidiaSerializer):
    class Meta(MidiaSerializer.Meta):
        model = Serie
        fields = "__all__"


class GameSerializer(MidiaSerializer):
    class Meta(MidiaSerializer.Meta):
        model = Game
        fields = "__all__"
