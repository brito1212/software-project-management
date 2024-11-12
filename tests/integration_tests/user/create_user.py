from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
import time

# Inicialize o WebDriver (certifique-se de que o caminho para o driver está correto)
driver = webdriver.Chrome()  # Use o caminho para o seu chromedriver se necessário

# Abra a página de cadastro
driver.get("http://localhost:3000/signup")

# Preencha os campos
driver.find_element(By.NAME, "first_name").send_keys("Nome Selenium")
driver.find_element(By.NAME, "last_name").send_keys("Sobrenome Selenium")
driver.find_element(By.NAME, "username").send_keys("usuarioTeste")
driver.find_element(By.NAME, "email").send_keys("email@teste.com")
driver.find_element(By.NAME, "password").send_keys("senhaSegura123")

# Clique no botão cadastrar
driver.find_element(
    By.XPATH, '//*[@id="root"]/div/main/section/section/form/button'
).click()

# Aguarde alguns segundos para visualizar o resultado
time.sleep(5)
input("Pressione Enter para finalizar...")
# Feche o navegador
driver.quit()
