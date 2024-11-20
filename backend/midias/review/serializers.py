from rest_framework import serializers

from user.models import User

from .models import Review, Comment



class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = "__all__"


class ReviewSerializerRead(serializers.ModelSerializer):
    comments = CommentSerializer(many=True, read_only=True)
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
