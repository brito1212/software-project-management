"""
Django settings for midias project.

Generated by 'django-admin startproject' using Django 5.1.1.

For more information on this file, see
https://docs.djangoproject.com/en/5.1/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/5.1/ref/settings/
"""

import os
from pathlib import Path

from dotenv import load_dotenv

load_dotenv()

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

ENVIRONMENT = os.getenv("ENVIRONMENT", "dev")

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/5.1/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = os.getenv("DJANGO_SECRET_KEY")

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = int(os.getenv("DEBUG", default=0))

ALLOWED_HOSTS = os.getenv("DJANGO_ALLOWED_HOSTS").split(" ")

CORS_ALLOWED_ORIGINS = ["http://localhost:3000", "http://127.0.0.1:3000"]

# Application definition

INSTALLED_INTERNAL = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
]

INSTALLED_THIRD = [
    "rest_framework",
    "oauth2_provider",
    "social_django",
    "drf_social_oauth2",
    "corsheaders",
]

INSTALLED_APP = ["user", "midia", "lista", "review", "comment"]

INSTALLED_APPS = INSTALLED_INTERNAL + INSTALLED_THIRD + INSTALLED_APP

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

ROOT_URLCONF = "midias.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
                "social_django.context_processors.backends",
                "social_django.context_processors.login_redirect",
            ],
        },
    },
]

WSGI_APPLICATION = "midias.wsgi.application"


# Database
# https://docs.djangoproject.com/en/5.1/ref/settings/#databases

DATABASES = {
    "default": {
        "ENGINE": os.environ.get("SQL_ENGINE", "django.db.backends.sqlite3"),
        "NAME": os.environ.get("DB_NAME", BASE_DIR / "db.sqlite3"),
        "USER": os.environ.get("DB_USER", "midias"),
        "PASSWORD": os.environ.get("DB_PASSWORD", "user123"),
        "HOST": os.environ.get("DB_HOST", "localhost"),
        "PORT": os.environ.get("DB_PORT", "5432"),
    }
}

# Password validation
# https://docs.djangoproject.com/en/5.1/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]


# Internationalization
# https://docs.djangoproject.com/en/5.1/topics/i18n/

LANGUAGE_CODE = "en-us"

TIME_ZONE = "America/Sao_Paulo"

USE_I18N = True

USE_TZ = False


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/5.1/howto/static-files/

STATIC_URL = "static/"

# Default primary key field type
# https://docs.djangoproject.com/en/5.1/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"


AUTH_USER_MODEL = "user.User"

AUTHENTICATION_BACKENDS = (
    "drf_social_oauth2.backends.DjangoOAuth2",
    "django.contrib.auth.backends.ModelBackend",
)

REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": (
        "oauth2_provider.contrib.rest_framework.OAuth2Authentication",
        "drf_social_oauth2.authentication.SocialAuthentication",
    )
}


PROJECT_FRONTEND_URL = os.getenv("PROJECT_FRONTEND_URL")


# EMAIL configuration
EMAIL_BACKEND = "django.core.mail.backends.smtp.EmailBackend"
EMAIL_HOST = os.getenv("EMAIL_HOST")
EMAIL_HOST_PASSWORD = os.getenv("EMAIL_HOST_PASSWORD")
EMAIL_HOST_USER = os.getenv("EMAIL_HOST_USER")
EMAIL_PORT = os.getenv("EMAIL_PORT")
EMAIL_USE_SSL = False
EMAIL_USE_TLS = True


# DEV configuration
if ENVIRONMENT == "dev":
    DEBUG = True

    print("Running in DEV mode")

    ALLOWED_HOSTS = ["*"]
    PROJECT_FRONTEND_URL = "http://localhost:3000"
    STATIC_ROOT = os.path.join(BASE_DIR, "staticfiles")

    EMAIL_HOST = os.getenv(
        "EMAIL_HOST", default="sandbox.smtp.mailtrap.io"
    )  # Desenvolvedor, crie uma conta no mailtrap.io e coloque aqui os dados da sua conta
    EMAIL_HOST_USER = os.getenv("EMAIL_HOST_USER", default="78592c2d254d94")
    EMAIL_HOST_PASSWORD = os.getenv("EMAIL_HOST_PASSWORD", default="9a573f9b9934d7")
    EMAIL_PORT = os.getenv("EMAIL_PORT", default="2525")

    MOVIE_AND_SERIE_API_URL = (
        "https://api.themoviedb.org/3/trending/{midia_type}/day?language=pt-BR"
    )
    MOVIE_AND_SERIE_DETAILS_API_URL = (
        "https://api.themoviedb.org/3/{midia_type}/{midia_id}?language=pt-BR"
    )
    MOVIE_AND_SERIE_CREDITS_API_URL = (
        "https://api.themoviedb.org/3/{midia_type}/{movie_id}/credits?language=pt-BR"
    )

    MOVIE_AND_SERIE_API_ACCESS_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0Y2U2ZWIxNzQ5MGZhYTg4ZDk1ZDZjMzNkZGFhOGRjZiIsIm5iZiI6MTczMTY0NzM5Mi45NDUxOTU0LCJzdWIiOiI2NzM2YzlkZmQ0ZmZiYTFlOGIyYjBmZDIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.dW6hm-dndISRLFUO9wodh--g7gF4qpBuAKFkKzS-e2g"
    MOVIE_AND_SERIE_IMAGES_URL = "https://image.tmdb.org/t/p/w500/"

    GAME_API_URL = "https://api.igdb.com/v4/games"
    GAME_API_CLIENT_ID = "lbsqn5uu60kqumu88rjeeixjalswpm"
    GAME_API_ACCESS_TOKEN = "aohn3le7iiijsrmr6vi0272zt9vch3"
    GAME_API_BODY = "fields id, name, first_release_date, summary, genres.name, platforms.name, involved_companies.*, involved_companies.company.name, cover.image_id; sort hypes desc; limit 20;"

    GAME_API_URL_TIME_TO_BEAT = "https://api.igdb.com/v4/game_time_to_beats"
    GAME_API_BODY_TIME_TO_BEAT = "fields *; where game_id = {game_id};"

    GAME_API_IMAGES_URL = "https://images.igdb.com/igdb/image/upload/t_cover_big/"


# URL base de aquivos de imagens
MEDIA_URL = "/images/"

# Caminho onde os arquivos de mídia serão salvos
MEDIA_ROOT = os.path.join(BASE_DIR, "images")
