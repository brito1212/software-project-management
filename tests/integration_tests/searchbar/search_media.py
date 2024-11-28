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

# Clique no searchbar
driver.find_element(By.XPATH, '//*[@id="searchField"]').send_keys("que")
time.sleep(1)

# Clique no botão de buscar
driver.find_element(By.XPATH, '//*[@id="magnifyingGlass"]').click()
time.sleep(1)

# Clica na categoria
driver.find_element(By.XPATH, '//*[@id="root"]/div/main/section/div[1]/div').click()
time.sleep(1)

# Clica na categoria jogos
driver.find_element(By.XPATH, '//*[@id="root"]/div/main/section/div[1]/div/div/label[3]/span[2]').click()
time.sleep(3)

# Clica na categoria jogos
driver.find_element(By.XPATH, '//*[@id="root"]/div/main/section/div[1]/div/div/label[3]/span[2]').click()
time.sleep(1)

# Clica na categoria filme
driver.find_element(By.XPATH, '//*[@id="root"]/div/main/section/div[1]/div/div/label[1]/span[2]').click()
time.sleep(3)

# Clica na categoria filme
driver.find_element(By.XPATH, '//*[@id="root"]/div/main/section/div[1]/div/div/label[1]/span[2]').click()
time.sleep(1)

# Clica na categoria
driver.find_element(By.XPATH, '//*[@id="root"]/div/main/section/div[1]/div').click()
time.sleep(1)

# Aguarde alguns segundos para visualizar o resultado
time.sleep(5)
input("Pressione Enter para finalizar...")
# Feche o navegador
driver.quit()
