from typing import Any
from django.shortcuts import render
import requests
from rest_framework.response import Response

from django.conf import settings
from .models import Game, Midia, Movie, Serie
from rest_framework.viewsets import ViewSet
from rest_framework import permissions, status, serializers
from .serializers import (
    GameSerializer,
    MovieSerializer,
    MovieSerializerFromAPI,
    SerieSerializer,
)
from rest_framework.decorators import action


class MidiaAbstractView(ViewSet):
    def get_permissions(self):
        if self.action in ["create", "update"]:
            self.permission_classes = [permissions.IsAdminUser]
        else:
            self.permission_classes = [permissions.IsAuthenticated]
        return super().get_permissions()

    def get_midia_seriaizer(self) -> serializers.ModelSerializer:
        pass

    def get_midia_model(self) -> Midia:
        pass

    @action(detail=False, methods=["get"])
    def fill_database(self, request):
        pass

    def __init__(self, **kwargs: Any) -> None:
        self.midia_model = self.get_midia_model()
        self.midia_serializer = self.get_midia_seriaizer()
        super().__init__(**kwargs)

    def create(self, request):
        try:
            midia = self.midia_serializer(data=request.data)
            if midia.is_valid():
                midia.save()
                return Response(
                    "Midia criada com sucesso!", status=status.HTTP_201_CREATED
                )
            return Response(midia.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            Response(
                f"Failed to create Midia: \n{str(e)}",
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

    def update(self, request):
        try:
            data = request.data
            midia = self.midia_model.objects.filter(id=data.get("id")).first()
            if midia:
                for key, value in data.items():
                    setattr(midia, key, value)
                midia.save()
                return Response(
                    {"message": "Midia updated successfully"}, status=status.HTTP_200_OK
                )
            return Response(
                {"message": "Midia not found"}, status=status.HTTP_404_NOT_FOUND
            )
        except Exception as e:
            return Response(
                f"Failed update midia: \n{str(e)}",
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

    def list(self, request):
        try:
            midias = self.midia_model.objects.all()
            serializer = self.midia_serializer(midias, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(
                f"Failed to retrieve midias: \n{str(e)}",
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

    @action(detail=True, methods=["get"])
    def get_by_id(self, request, pk=None):
        try:
            midia_id = pk
            midia = self.midia_model.objects.filter(id=midia_id).first()
            if midia:
                serializer = self.midia_serializer(midia, many=False)
                return Response(serializer.data)
            return Response(
                {"message": "Midia not found"}, status=status.HTTP_404_NOT_FOUND
            )
        except Exception as e:
            return Response(
                f"Failed to list Midias: \n{str(e)}",
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

    @action(detail=False, methods=["get"])
    def search(self, request):
        try:
            title_search = request.GET.get("q", "")
            if title_search:
                midias = self.midia_model.objects.filter(title__icontains=title_search)
                if midias:
                    serializer = self.midia_serializer(midias, many=True)
                    return Response(serializer.data)
                return Response(
                    {"message": "Midias not found"}, status=status.HTTP_404_NOT_FOUND
                )
            return Response(
                {"message": "No title given to filter"},
                status=status.HTTP_404_NOT_FOUND,
            )
        except Exception as e:
            return Response(
                f"Failed to list Midias: \n{str(e)}",
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )


class MovieView(MidiaAbstractView):

    def get_midia_seriaizer(self) -> serializers.ModelSerializer:
        return MovieSerializer

    def get_midia_model(self) -> Midia:
        return Movie

    @action(detail=False, methods=["get"])
    def fill_database(self, request):
        try:
            url = settings.MOVIE_AND_SERIE_API_URL.format(midia_type="movie")
            headers = {
                "accept": "application/json",
                "Authorization": "Bearer " + settings.MOVIE_AND_SERIE_API_ACCESS_TOKEN,
            }

            response = requests.get(url, headers=headers)
            data = response.json()
            results = data.get("results", [])
            for result in results:
                url_details = settings.MOVIE_AND_SERIE_DETAILS_API_URL.format(
                    midia_type="movie", midia_id=result.get("id")
                )
                response_details = requests.get(url_details, headers=headers)
                data_details = response_details.json()

                url_credits = settings.MOVIE_AND_SERIE_CREDITS_API_URL.format(
                    midia_type="movie", movie_id=result.get("id")
                )
                response_credits = requests.get(url_credits, headers=headers)
                data_credits = response_credits.json()
                cast = data_credits.get("cast", [])
                data_details["cast"] = cast[:10] if len(cast) > 10 else cast
                data_details["director"] = next(
                    (
                        member["original_name"]
                        for member in data_credits["crew"]
                        if member["job"] == "Director"
                    ),
                    None,
                )

                serializer = MovieSerializerFromAPI(data=data_details)
                if serializer.is_valid():
                    if not Movie.objects.filter(title=data_details["title"]).exists():
                        movie = serializer.save()
                        print(f"Filme salvo: {movie.title}")
                    print(f"Filme {data_details['title']} já existe no banco")
                else:
                    print(serializer.errors)
            return Response(
                "DB filled successfully with new Movies!", status=status.HTTP_200_OK
            )

        except Exception as e:
            return Response(
                f"Failed to fill DB: \n{str(e)}",
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )


class SerieView(MidiaAbstractView):

    def get_midia_seriaizer(self) -> serializers.ModelSerializer:
        return SerieSerializer

    def get_midia_model(self) -> Midia:
        return Serie


class GameView(MidiaAbstractView):

    def get_midia_seriaizer(self) -> serializers.ModelSerializer:
        return GameSerializer

    def get_midia_model(self) -> Midia:
        return Game
