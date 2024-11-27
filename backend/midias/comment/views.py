from django.shortcuts import render
from rest_framework.viewsets import ViewSet
from rest_framework import permissions, status
from rest_framework.response import Response

from .models import Comment
from .serializers import CommentSerializer


# Create your views here.
class CommentView(ViewSet):
    permission_classes = [permissions.IsAuthenticated]

    def create(self, request):
        try:
            comment = CommentSerializer(data=request.data)
            if comment.is_valid():
                comment.save()
                return Response(
                    "Comment criado com sucesso!", status=status.HTTP_201_CREATED
                )
            return Response(comment.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            Response(
                f"Failed to create Comment: \n{str(e)}",
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

    def update(self, request, pk=None):
        try:
            data = request.data
            comment = Comment.objects.filter(id=pk).first()
            if comment:
                for key, value in data.items():
                    setattr(comment, key, value)
                comment.save()
                return Response(
                    {"message": "Comment updated successfully"},
                    status=status.HTTP_200_OK,
                )
            return Response(
                {"message": "Comment not found"}, status=status.HTTP_404_NOT_FOUND
            )
        except Exception as e:
            return Response(
                f"Failed to update Comment: \n{str(e)}",
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

    def destroy(self, request, pk=None):
        try:
            comment = Comment.objects.filter(id=pk).first()
            if comment:
                comment.delete()
                return Response(
                    {"message": "Comment deleted successfully"},
                    status=status.HTTP_200_OK,
                )
            return Response(
                {"message": "Comment not found"}, status=status.HTTP_404_NOT_FOUND
            )
        except Exception as e:
            return Response(
                f"Failed to delete Comment: \n{str(e)}",
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

    def list(self, request):
        try:
            data = request.data
            review = data.get("review")
            comments = Comment.objects.filter(review=review)
            if comments:
                serializer = CommentSerializer(comments, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(
                f"Failed to retrieve comments: \n{str(e)}",
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )
