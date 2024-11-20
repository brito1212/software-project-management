from django.shortcuts import render
from rest_framework.viewsets import ViewSet
from rest_framework import permissions, status
from rest_framework.response import Response

from midia.models import Midia

from .models import Review, Comment
from .serializers import CommentSerializer, ReviewSerializer, ReviewSerializerRead


class ReviewView(ViewSet):
    permission_classes = [permissions.IsAuthenticated]

    def create(self, request):
        try:
            review = ReviewSerializer(data=request.data)
            if review.is_valid():
                review.save()
                return Response(
                    "Review criada com sucesso!", status=status.HTTP_201_CREATED
                )
            return Response(review.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            Response(
                f"Failed to create Review: \n{str(e)}",
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

    def update(self, request, pk=None):
        try:
            data = request.data
            review = Review.objects.filter(id=pk).first()
            if review:
                for key, value in data.items():
                    setattr(review, key, value)
                review.save()
                return Response(
                    {"message": "Review updated successfully"},
                    status=status.HTTP_200_OK,
                )
            return Response(
                {"message": "Review not found"}, status=status.HTTP_404_NOT_FOUND
            )
        except Exception as e:
            return Response(
                f"Failed to update Review: \n{str(e)}",
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

    def destroy(self, request, pk=None):
        try:
            current_user = request.user
            review = Review.objects.filter(id=pk).first()
            if review:
                if review.user.id != current_user.id:
                    return Response(
                        {"message": "Somente o autor de uma review podem deletá-la"},
                        status=status.HTTP_401_UNAUTHORIZED,
                    )
                review.delete()
                return Response(
                    {"message": "Review deleted successfully"},
                    status=status.HTTP_200_OK,
                )
            return Response(
                {"message": "Review not found"}, status=status.HTTP_404_NOT_FOUND
            )
        except Exception as e:
            return Response(
                f"Failed to delete Review: \n{str(e)}",
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

    def list(self, request):
        try:
            midia_id = request.GET.get("midiaId", "")
            midia = Midia.objects.filter(id=midia_id).first()
            if midia:
                reviews = Review.objects.filter(midia=midia)
                if reviews:
                    serializer = ReviewSerializerRead(reviews, many=True)
                    return Response(serializer.data, status=status.HTTP_200_OK)
                return Response([], status=status.HTTP_404_NOT_FOUND)
            return Response(
                {"message": "Midia not found"}, status=status.HTTP_404_NOT_FOUND
            )
        except Exception as e:
            return Response(
                f"Failed to retrieve reviews: \n{str(e)}",
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )


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

    def destroy(self, request):
        try:
            data = request.data
            comment = Comment.objects.filter(id=data.get("id")).first()
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
