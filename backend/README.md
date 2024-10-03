docker build --pull --rm -f "backend\Dockerfile" -t softwareprojectmanagement:latest "backend"

docker compose -f "backend\docker-compose.yml" up -d --build 