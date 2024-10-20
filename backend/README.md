# Backend Django Midias

Este é o backend de uma aplicação Web feita em Django, utilizando PostgreSQL como banco de dados. Abaixo estão as instruções para configurar e rodar o ambiente de desenvolvimento.

## Ambiente Virtual

O projeto usa a biblioteca **Poetry** para gerenciar dependências. Siga as instruções abaixo para iniciar o ambiente virtual e instalar as dependências do projeto.

### Instalação do Poetry

Caso não tenha o Poetry instalado, você pode instalá-lo através dos comandos:

- **Linux/MacOS**:
```bash
  curl -sSL https://install.python-poetry.org | python3 -
```

- **Windows (PowerShell)**:
```bash
  (Invoke-WebRequest -Uri https://install.python-poetry.org -UseBasicParsing).Content |python -
```

Após a instalação, você pode ativar o ambiente virtual e instalar as dependências:

### Ativando o ambiente virtual e instalando dependências
1. **Inicie o ambiente virtual**:
```bash
  poetry shell
```
2. **Instale as dependências**:
```bash
  poetry install
```

## Conteiner da Aplicação e Banco de Dados 
Este projeto utiliza PostgreSQL como banco de dados. Para rodar o ambiente de desenvolvimento com o banco de dados configurado, recomenda-se utilizar **Docker**.

### Subindo o Banco de Dados com Docker 
Para rodar o banco de dados e o backend, siga os seguintes passos:
1. **Build da imagem do backend**:
```bash
  docker build --pull --rm -f "backend\Dockerfile" -t softwareprojectmanagement:latest "backend"
```
2. **Subir os contêineres**:
```bash
  docker compose -f "backend\docker-compose.yml" up -d --build
```
OBS: Para desenvolvimento, recomenda-se manter apenas o contêiner do banco de dados rodando e interromper o contêiner do backend para rodá-lo diretamente em modo de depuração.



## Variáveis de Ambiente
Verifique o arquivo `.env.example` para configurar as variáveis de ambiente necessárias para o projeto. Certifique-se de criar um arquivo `.env` com as configurações adequadas.


## Rodando a Aplicação
Após configurar o ambiente e instalar as dependências, siga os passos abaixo para rodar a aplicação:

1. **Navegar até a pasta do projeto**: O projeto está localizado na pasta midias, portanto, todos os comandos do Django devem ser executados dentro desta pasta.
```bash
  cd midias
```

2. **Migrações de banco de dados**: As migrações são usadas para aplicar as alterações no banco de dados. O Django gera scripts para manter o banco em sincronia com o modelo de dados.
    - Para criar novas migrações com base nas mudanças dos modelos:
    ```bash
        python manage.py makemigrations
    ```
    Isso gera arquivos de migração para aplicar alterações no banco de dados.
    - Para aplicar as migrações:
    ```bash
        python manage.py migrate
    ```
    Isso aplica as mudanças no banco de dados.

3. **Criar um superusuário**: Para acessar o painel de administração do Django, crie um usuário com permissões de admin:
```bash
  python manage.py createsuperuser
```
3. **Rodar a aplicação**: Para iniciar o servidor de desenvolvimento:
```bash
  python manage.py runserver
```
O backend estará disponível em http://localhost:8000.

## Configurando Django OAuth
Para que o frontend consiga se autenticar com o backend, é necessário criar uma application no Django OAuth.

1. Acesse o painel de administração em http://localhost:8000/admin.
2. Caso não tenha um superusuário, crie um com o comando:
```bash
  python manage.py createsuperuser
```
3. No painel de administração, acesse a tabela "Applications" e clique em "Add application".
4. Preencha o formulário da seguinte maneira:
    - **User**: Selecione o superusuário criado.
    - **Client** type: Confidential.
    - **Authorization grant type**: Resource owner password-based.
    - **Name**: Insira qualquer nome.

**IMPORTANTE**: Copie o valor do `client_secret` pois ele será utilizado no frontend e não poderá ser visualizado novamente. Caso perca este valor, será necessário criar uma nova `application`.
5. Com o `client_id` e o `client_secret` em mãos, anote esses valores e configure o arquivo .env do frontend com esses dados.

