# Configuração do Ambiente de Testes de Integração

Este guia apresenta as instruções para configurar o ambiente de testes de integração da aplicação. Os testes são feitos utilizando a biblioteca [Selenium](https://selenium.dev/) com scripts em Python.

## Estrutura de Diretórios

Os códigos de teste estão organizados dentro do diretório `integration_tests`, onde cada subpasta representa um conjunto específico de testes. Por exemplo, na pasta `integration_tests/user` há testes relacionados a usuários, como o teste de criação de usuário (`create_user.py`).

## Configuração do Ambiente de Teste

Para configurar o ambiente de testes, siga os passos abaixo:

1. **Acesse o diretório de testes:**
```bash
   cd tests
````
2. **Crie uma virtualenv:** Para garantir que as dependências de teste não interfiram no ambiente global do Python, recomendamos a criação de um ambiente virtual com o seguinte comando:
````bash
    python -m venv venv
````
Isso criará uma virtualenv chamada venv dentro do diretório `tests`.

3. **Ative a virtualenv:**
- No Windows
````bash
    .\venv\Scripts\activate
````

- No macOS/Linux:
````bash
    source venv/bin/activate
````

4. **Instale a biblioteca Selenium:** Com a virtualenv ativa, instale o Selenium com o comando:
````bash
    pip install selenium
````
A biblioteca Selenium permite controlar navegadores para simular a interação com a aplicação, o que é fundamental para nossos testes de integração.

## Executando os Testes

Para rodar um teste específico, basta navegar até o diretório que contém o código e executar o arquivo Python do teste. Por exemplo:

1. **Navegue até o diretório do teste de criação de usuário:**

````bash
    cd integration_tests/user
````

2. **Execute o teste de criação de usuário:**

````bash
    python create_user.py
````

Isso iniciará o teste de integração, simulando as ações necessárias para a criação de um usuário na aplicação. Repita este processo para outros testes nas diferentes pastas do diretório `integration_tests`.

Pronto! O ambiente de testes de integração está configurado e pronto para uso.