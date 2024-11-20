from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time

# Inicialize o WebDriver (certifique-se de que o caminho para o driver está correto)
driver = webdriver.Chrome()  # Use o caminho para o seu chromedriver se necessário

# Abra a página de cadastro
driver.get("http://localhost:3000")
wait = WebDriverWait(driver, 5) 
time.sleep(1)

# Clique no botão de login
driver.find_element(By.XPATH, '//*[@id="root"]/div/header/div[2]/a[1]').click()
time.sleep(1)

# Preencha os campos
driver.find_element(By.NAME, "email").send_keys("teste@teste.com")
driver.find_element(By.NAME, "password").send_keys("#Abcd1234")
time.sleep(1)

# Clique no botão entrar
driver.find_element(By.XPATH, '/html/body/div/div/main/section/section/form/button').click()

wait.until(EC.presence_of_element_located((By.XPATH, '//*[@id="root"]/div/header/div[2]/a')))
time.sleep(8)
# ------------------------------------------------------------------------------------------------ Entrou na conta
# Clica no sanduiche:
driver.find_element(By.XPATH, '//*[@id="root"]/div/header/div[1]/div/label').click()
time.sleep(1)

# Clica no botão de lista
driver.find_element(By.XPATH, '//*[@id="root"]/div/main/aside/div[1]/ul/li[2]/a').click()
time.sleep(2)

# clica no x do menu
driver.find_element(By.XPATH, '//*[@id="root"]/div/header/div[1]/div/label').click()
time.sleep(1)

# Clica no botão de criar lista
driver.find_element(By.XPATH, '//*[@id="root"]/div/main/section/div[2]/a').click()
driver.find_element(By.XPATH, '//*[@id="root"]/div/main/section/div[2]/a').click()
time.sleep(3)

# mudar url para http://localhost:3000/midia/movie/1
driver.get("http://localhost:3000/midia/movie/1")
time.sleep(3)

# Clica no botão de adicionar a lista
driver.find_element(By.XPATH, '//*[@id="root"]/div/main/div/div/div[1]/div/div[2]/div/div[4]/div/div[2]/button/i').click()
time.sleep(2)                  

# # Clica na lista que deseja adicionar
driver.find_element(By.XPATH, '//*[@id="root"]/div/main/div/div/div[1]/div/div[2]/ul/li[1]/button/span').click()
time.sleep(2)

# Clica nos 3 pontos
driver.find_element(By.XPATH, '//*[@id="root"]/div/main/section/div/div[1]/button').click()
time.sleep(1)

# Clica no Editar detalhes
driver.find_element(By.XPATH, '//*[@id="root"]/div/main/section/div/div[2]/ul/li[1]/a').click()
time.sleep(1)

driver.find_element(By.NAME, "name").send_keys(" de teste")
driver.find_element(By.NAME, "description").send_keys(" para esta lista de realização de testes")
time.sleep(1)

# Clica em salvar
driver.find_element(By.XPATH, '//*[@id="root"]/div/main/section/div[1]/form/button[2]').click()
time.sleep(3)

# clica em deletar lista
driver.find_element(By.XPATH, '//*[@id="root"]/div/main/section/div/div[2]/ul/li[2]/a').click()
time.sleep(1)

# clica em confirmar
driver.find_element(By.XPATH, '//*[@id="root"]/div/main/section/div[1]/form/div/button[1]').click()
time.sleep(2)

# Aguarde alguns segundos para visualizar o resultado
time.sleep(5)
input("Pressione Enter para finalizar...")
# Feche o navegador
driver.quit()
