from django.shortcuts import render
from .models import Lista
from .serializers import ListaSerializer
from rest_framework.views import APIView
from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.viewsets import ViewSet
from rest_framework.decorators import action
from midia.models import Genres, Platforms


# Create your views here.
class ListaView(ViewSet):
    permission_classes = [permissions.IsAuthenticated]

    def create(self, request):
        try:
            lista = ListaSerializer(data=request.data)
            if lista.is_valid():
                lista.save()
                return Response(
                    "Lista criada com sucesso!", status=status.HTTP_201_CREATED
                )
            return Response(lista.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            Response(
                f"Failed to create Lista: \n{str(e)}",
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

    def update(self, request):
        try:
            data = request.data
            lista = Lista.objects.filter(id=data.get("id")).first()
            if lista:
                for key, value in data.items():
                    setattr(lista, key, value)
                lista.save()
                return Response(
                    {"message": "Lista updated successfully"}, status=status.HTTP_200_OK
                )
            return Response(
                {"message": "Lista not found"}, status=status.HTTP_404_NOT_FOUND
            )
        except Exception as e:
            return Response(
                f"Failed to update Lista: \n{str(e)}",
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

    def destroy(self, request):
        try:
            data = request.data
            lista = Lista.objects.filter(id=data.get("id")).first()
            if lista:
                lista.delete()
                return Response(
                    {"message": "Lista deleted successfully"}, status=status.HTTP_200_OK
                )
            return Response(
                {"message": "Lista not found"}, status=status.HTTP_404_NOT_FOUND
            )
        except Exception as e:
            return Response(
                f"Failed to delete Lista: \n{str(e)}",
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

    def list(self, request):

        def get_genres_names(genres):
            genres_names = []
            for genre_id in genres:
                genre = Genres.objects.filter(id=genre_id).first()
                genres_names.append(genre.name)
            return genres_names

        def get_platforms_names(platforms):
            platforms_names = []
            for platform_id in platforms:
                platform = Platforms.objects.filter(id=platform_id).first()
                platforms_names.append(platform.name)
            return platforms_names

        try:
            listas = Lista.objects.all()
            serializer = ListaSerializer(listas, many=True)
            if listas:
                listas = serializer.data
                for lista in listas:
                    for midia in lista["midias"]:
                        # TODO: Por algum motivo o serializer de Midia não está mapeando os nomes de genres e platformsm, apenas id
                        midia["genres"] = get_genres_names(midia["genres"])
                        midia["platforms"] = get_platforms_names(midia["platforms"])
                return Response(serializer.data)
            return Response(
                {"message": "Listas not found"}, status=status.HTTP_404_NOT_FOUND
            )
        except Exception as e:
            return Response(
                f"Failed to list Listas: \n{str(e)}",
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

    @action(detail=False, methods=["post"])
    def list_lista_by_name(self, request):
        try:
            name = request.data.get("name", "")
            listas = Lista.objects.filter(name__contains=name)
            serializer = ListaSerializer(listas, many=True)
            return Response(serializer.data)
        except Exception as e:
            return Response(
                f"Failed to list Listas: \n{str(e)}",
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )
