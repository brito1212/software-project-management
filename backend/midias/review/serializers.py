from rest_framework import serializers

from comment.serializers import CommentSerializer, CommentSerializerRead
from user.models import User

from .models import Review


class ReviewSerializerRead(serializers.ModelSerializer):
    comments = CommentSerializerRead(many=True, read_only=True)
    class UserSerializer(serializers.ModelSerializer):
        class Meta:
            model = User
            fields = ['id', 'username', 'profile_image']

    user = UserSerializer(read_only=True)

    class Meta:
        model = Review
        fields = "__all__"


class ReviewSerializer(serializers.ModelSerializer):
    comments = CommentSerializer(many=True, read_only=True)

    class Meta:
        model = Review
        fields = "__all__"
