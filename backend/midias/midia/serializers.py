from django.conf import settings
from .models import Game, Midia, Movie, Platforms, Serie
from rest_framework import serializers
from datetime import time


class PlatformSerializer(serializers.Serializer):
    class Meta:
        model = Platforms
        fields = ["name"]


class MidiaSerializer(serializers.ModelSerializer):
    platforms = serializers.StringRelatedField(many=True, read_only=True)

    class Meta:
        model = Midia
        fields = "__all__"


class MovieSerializerFromAPI(serializers.Serializer):
    title = serializers.CharField()
    release_date = serializers.DateField()
    overview = serializers.CharField()  # Mapeando 'overview' para 'description'
    runtime = serializers.IntegerField()  # Mapeando 'runtime' para 'duration'
    genres = serializers.ListField(child=serializers.DictField())
    production_companies = serializers.ListField()
    poster_path = serializers.CharField()
    cast = serializers.ListField(child=serializers.DictField())
    director = serializers.CharField()

    class Meta:
        model = Movie
        fields = "__all__"

    def create(self, validated_data):
        # Processa os dados para criar um filme
        genres_data = validated_data.pop("genres", [])
        cast_data = validated_data.pop("cast", [])
        director_data = validated_data.pop("director", None)
        release_date = validated_data.pop("release_date", None)
        runtime = validated_data.pop("runtime", 0)

        movie_data = {
            "title": validated_data.get("title"),
            "description": validated_data.get("overview"),
            "duration": time(hour=runtime // 60, minute=runtime % 60),
            "publish_date": release_date.isoformat(),
            "banner": settings.MOVIE_AND_SERIE_IMAGES_URL
            + validated_data.get("poster_path"),
        }
        movie = Movie.objects.create(**movie_data)
        movie.studio = validated_data.get("production_companies")[0]["name"]
        movie.genres = [genre["name"] for genre in genres_data]
        movie.cast = [cast_member["original_name"] for cast_member in cast_data]
        movie.director = director_data
        movie.save()
        return movie


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
