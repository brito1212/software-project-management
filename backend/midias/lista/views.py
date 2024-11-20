from django.shortcuts import render
from .models import Lista
from .serializers import ListaSerializer
from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.viewsets import ViewSet
from rest_framework.decorators import action


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

    def partial_update(self, request, pk=None):
        try:
            data = request.data
            lista = Lista.objects.filter(id=pk).first()
            print(lista)
            listaSerializer = ListaSerializer(lista, data=request.data)
            print(listaSerializer)
            if listaSerializer.is_valid():
                listaSerializer.save()
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

    def destroy(self, request, pk=None):
        try:
            data = request.data
            lista = Lista.objects.filter(id=pk).first()
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
        try:
            listas = Lista.objects.all()
            if listas:
                serializer = ListaSerializer(listas, many=True)
                return Response(serializer.data)
            return Response(
                {"message": "Listas not found"}, status=status.HTTP_404_NOT_FOUND
            )
        except Exception as e:
            return Response(
                f"Failed to list Listas: \n{str(e)}",
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

    @action(detail=False, methods=["get"])
    def search(self, request):
        try:
            lista_search = request.GET.get('q', '')
            if lista_search:
                listas = Lista.objects.filter(name__icontains=lista_search)
                if listas:
                    serializer = ListaSerializer(listas, many=True)
                    return Response(serializer.data)
                return Response(
                    {"message": "Listas not found"}, status=status.HTTP_404_NOT_FOUND
                )
            return Response(
                {"message": "No Name given to filter Listas"},
                status=status.HTTP_404_NOT_FOUND,
            )
        except Exception as e:
            return Response(
                f"Failed to search Listas: \n{str(e)}",
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )
        
