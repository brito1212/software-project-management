from django.conf import settings
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework import status, generics, permissions
from rest_framework.response import Response
from .serializers import RegistrationSerializer, UsersSerializer
from .models import PasswordResetToken, User
from django.core.mail import send_mail
from django.utils.html import strip_tags
from django.template.loader import render_to_string
from rest_framework.decorators import action
from rest_framework.viewsets import ViewSet


class CreateUser(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        reg_serializer = RegistrationSerializer(data=request.data)
        if reg_serializer.is_valid():
            new_user = reg_serializer.save()
            if new_user:
                host = settings.PROJECT_FRONTEND_URL
                verify_user_link = f"{host}/signup-success/{new_user.id}"

                subject = "Validação de conta"
                html_message = render_to_string(
                    "verify_user_email.html",
                    {
                        "username": new_user.first_name,
                        "verify_user_link": verify_user_link,
                    },
                )
                plain_message = strip_tags(html_message)
                from_email = settings.EMAIL_HOST_USER
                to_email = new_user.email

                send_mail(
                    subject,
                    plain_message,
                    from_email,
                    [to_email],
                    html_message=html_message,
                )
                return Response(status=status.HTTP_201_CREATED)
        return Response(reg_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


from rest_framework import status, generics


class AllUsers(generics.ListAPIView):
    permission_classes = [permissions.AllowAny]
    queryset = User.objects.all()
    serializer_class = UsersSerializer


class CurrentUser(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request):
        serializer = UsersSerializer(self.request.user)
        return Response(serializer.data)


class UserView(ViewSet):
    permission_classes = (permissions.IsAuthenticated,)

    @action(detail=True, methods=["get"])
    def get_user_by_id(self, request, pk=None):
        try:
            # data = request.data
            user = User.objects.filter(id=pk).first()
            if user:
                serializer = UsersSerializer(user)
                return Response(serializer.data)
            return Response(
                {"message": "User not found"}, status=status.HTTP_404_NOT_FOUND
            )
        except Exception as e:
            return Response(
                f"Failed to get user: \n{str(e)}",
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )
        
    @action(detail=True, methods=["get"])
    def get_user_by_username(self, request, pk=None):
        try:
            # data = request.data
            user = User.objects.filter(username=pk).first()
            if user:
                serializer = UsersSerializer(user)
                return Response(serializer.data)
            return Response(
                {"message": "Usuário não encontrado!"}, status=status.HTTP_404_NOT_FOUND
            )
        except Exception as e:
            return Response(
                f"Failed to get user: \n{str(e)}",
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

    @action(detail=True, methods=["post"])
    def follow(self, request, pk=None):
        try:
            follower = request.user 
            following = User.objects.filter(username=pk).first()  # Usuário a ser seguido
            
            # Verifica se o usuário já segue
            if following.seguidores.filter(id=follower.id).exists():
                return Response(
                    {"message": "Você já segue este usuário."},
                    status=status.HTTP_400_BAD_REQUEST
                )

            # Adiciona o seguidor ao usuário
            following.seguidores.add(follower)
            follower.seguindo.add(following)
            following.save()

            return Response(
                {"message": f"Você começou a seguir {following.username}."},
                status=status.HTTP_200_OK
            )
        except Exception as e:
            return Response(
                 {"error": f"Erro ao seguir o usuário: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    @action(detail=True, methods=["post"])
    def unfollow(self, request, pk=None):
        try:
            follower = request.user  
            following = User.objects.filter(username=pk).first() 

            # Verifica se o usuário não segue o outro
            if not following.seguidores.filter(id=follower.id).exists():
                return Response(
                    {"message": "Você não segue este usuário."},
                    status=status.HTTP_400_BAD_REQUEST
                )

            # Remove o seguidor do usuário
            following.seguidores.remove(follower)
            follower.seguindo.remove(following)
            following.save()

            return Response(
                 {"message": f"Você parou de seguir {following.username}."},
                status=status.HTTP_200_OK
            )
        except Exception as e:
            return Response(
               {"error": f"Erro ao deixar de seguir o usuário: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


class UpdateUser(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request, pk):
        try:
            data = request.data
            if(data['first_name'] == '' or data['last_name']  == '' or data['username']  == ''):
                return Response(
                    {"message": "Data is blank"}, status=status.HTTP_400_BAD_REQUEST
                )
            user = User.objects.filter(id=pk).first()
            if user:
                for key, value in data.items():
                    setattr(user, key, value)
                user.save()
                return Response(
                    {"message": "User updated successfully"}, status=status.HTTP_200_OK
                )
            return Response(
                {"message": "User not found"}, status=status.HTTP_404_NOT_FOUND
            )
        except Exception as e:
            return Response(
                f"Failed update user: \n{str(e)}",
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )


class PasswordReset(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        try:
            new_password = request.data.get("new_password")
            token = request.data.get("token")

            if token is None:
                raise AttributeError("Token not found")

            token = PasswordResetToken.objects.filter(token=token).first()

            if not token:
                raise Exception("Token does not exist")

            if token.is_expired() is True:
                raise Exception("Token recover expired")

            user = token.user

            if new_password is None or new_password == "":
                raise AttributeError("New password not found")

            user.set_password(new_password)
            user.save()

            return Response(
                {"message": "Reset password successfully"}, status=status.HTTP_200_OK
            )
        except Exception as e:
            return Response(
                f"Failed change password: \n{str(e)}",
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )


class ForgetPassword(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        try:
            email = str(request.data.get("email")).lower()
            try:
                user = User.objects.get(email=email)
            except User.DoesNotExist:
                raise Exception("User not found")

            token = PasswordResetToken(user=user)
            token.save()

            host = settings.PROJECT_FRONTEND_URL
            password_reset_link = f"{host}/password-recover?recoverId={token.token}"

            subject = "Recuperação de Senha"
            html_message = render_to_string(
                "password_reset_email.html",
                {
                    "username": user.first_name,
                    "password_reset_link": password_reset_link,
                },
            )
            plain_message = strip_tags(html_message)
            from_email = settings.EMAIL_HOST_USER
            to_email = user.email

            send_mail(
                subject,
                plain_message,
                from_email,
                [to_email],
                html_message=html_message,
            )

            return Response(
                {"message": "Email successfully sent"}, status=status.HTTP_200_OK
            )
        except Exception as e:
            return Response(
                f"Failed forget password: \n{str(e)}",
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )
