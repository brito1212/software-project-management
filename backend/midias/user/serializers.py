from rest_framework import serializers
from .models import User
from lista.serializers import ListaSerializer


class RegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("email", "username", "password", "first_name", "last_name", "profile_image", "banner")
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        password = validated_data.pop("password", None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance


class UsersSerializer(serializers.ModelSerializer):
    listas = ListaSerializer(many=True)

    class Meta:
        model = User
        fields = (
            "id",
            "email",
            "username",
            "first_name",
            "last_name",
            "seguidores",
            "seguindo",
            "listas",
            "profile_image",
            "banner",
        )
