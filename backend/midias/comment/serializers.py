from rest_framework import serializers

from user.models import User

from .models import Comment


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = "__all__"


class CommentSerializerRead(serializers.ModelSerializer):
    class UserSerializer(serializers.ModelSerializer):
        class Meta:
            model = User
            fields = ["id", "username", "profile_image"]

    user = UserSerializer(read_only=True)

    class Meta:
        model = Comment
        fields = "__all__"
