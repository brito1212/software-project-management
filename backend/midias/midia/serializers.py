from django.conf import settings
from .models import Game, Midia, Movie, Serie
from rest_framework import serializers
from datetime import time, datetime, timedelta, timezone


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
            "media_type": "movie"
        }
        movie = Movie.objects.create(**movie_data)
        movie.studio = validated_data.get("production_companies")[0]["name"]
        movie.genres = [genre["name"] for genre in genres_data]
        movie.cast = [cast_member["original_name"] for cast_member in cast_data]
        movie.director = director_data
        movie.save()
        return movie


class SerieSerializerFromAPI(serializers.Serializer):
    name = serializers.CharField()  # title
    first_air_date = serializers.DateField()  # publish_date
    overview = serializers.CharField(allow_blank=True)  # description
    genres = serializers.ListField(child=serializers.DictField())  # genres
    production_companies = serializers.ListField(
        child=serializers.DictField()
    )  # studio
    poster_path = serializers.CharField()  # banner
    networks = serializers.ListField(child=serializers.DictField())  # platforms

    created_by = serializers.ListField(child=serializers.DictField())
    number_of_episodes = serializers.IntegerField()
    number_of_seasons = serializers.IntegerField()

    class Meta:
        model = Serie
        fields = "__all__"

    def create(self, validated_data):
        # Processa os dados para criar um filme
        genres_data = validated_data.pop("genres", [])
        created_by_data = validated_data.pop("created_by", [])
        production_companies_data = validated_data.pop("production_companies", [])
        networks_data = validated_data.pop("networks", [])
        first_air_date = validated_data.pop("first_air_date", None)

        serie_data = {
            "title": validated_data.get("name"),
            "description": validated_data.get("overview"),
            "seasons": validated_data.get("number_of_seasons"),
            "episodes": validated_data.get("number_of_episodes"),
            "publish_date": first_air_date.isoformat(),
            "banner": settings.MOVIE_AND_SERIE_IMAGES_URL
            + validated_data.get("poster_path"),
            "media_type": "serie"
        }
        serie = Serie.objects.create(**serie_data)
        serie.studio = production_companies_data[0]["name"]
        serie.genres = [genre["name"] for genre in genres_data]
        serie.created_by = created_by_data[0]["name"] if created_by_data else None
        serie.platforms = [network["name"] for network in networks_data]

        serie.save()
        return serie


class GameSerializerFromAPI(serializers.Serializer):
    name = serializers.CharField()  # title
    first_release_date = serializers.IntegerField()  # publish_date
    summary = serializers.CharField()  # description
    genres = serializers.ListField(child=serializers.DictField())  # genres
    platforms = serializers.ListField(child=serializers.DictField())  # platforms

    involved_companies = serializers.ListField(child=serializers.DictField())
    cover = serializers.DictField()

    normally = serializers.IntegerField()

    class Meta:
        model = Game
        fields = "__all__"

    def create(self, validated_data):
        genres_data = validated_data.pop("genres", [])
        platforms_data = validated_data.pop("platforms", [])
        involved_companies_data = validated_data.pop("involved_companies", [])
        cover_data = validated_data.pop("cover", {})

        dt = datetime.fromtimestamp(
            validated_data.get("first_release_date"), tz=timezone.utc
        )

        game_data = {
            "title": validated_data.get("name"),
            "publish_date": dt.strftime('%Y-%m-%d'),
            "description": validated_data.get("summary"),
            "banner": settings.GAME_API_IMAGES_URL + cover_data["image_id"] + ".png",
            "avarage_playtime": timedelta(seconds=validated_data.get("normally")),
            "media_type": "game"
        }

        game = Game.objects.create(**game_data)
        game.genres = [genre["name"] for genre in genres_data]
        game.platforms = [platform["name"] for platform in platforms_data]
        game.studio = next(
            (
                company["company"]["name"]
                for company in involved_companies_data
                if company["developer"]
            ),
            None,
        )
        game.publisher = next(
            (
                company["company"]["name"]
                for company in involved_companies_data
                if company["publisher"]
            ),
            None,
        )
        game.save()
        return game


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
