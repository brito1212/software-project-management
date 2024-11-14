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
driver.find_element(By.NAME, "email").send_keys("email@teste.com")
driver.find_element(By.NAME, "password").send_keys("senhaSegura123")
time.sleep(1)

# Clique no botão entrar
driver.find_element(By.XPATH, '/html/body/div/div/main/section/section/form/button').click()


wait.until(EC.presence_of_element_located((By.XPATH, '//*[@id="root"]/div/header/div[2]/a')))
time.sleep(5)

# Botão de visualizar usuário
driver.find_element(By.XPATH, '//*[@id="root"]/div/header/div[2]/a').click()
time.sleep(1)

# Botão editar perfil
driver.find_element(By.XPATH, '//*[@id="root"]/div/main/div/div[1]/div/div/button').click()
time.sleep(1)

# Preencha os campos
driver.find_element(By.NAME, "banner").send_keys("C:/Users/JorgeFerreira/Pictures/spider-man-banner.jpg")
time.sleep(1)
driver.find_element(By.NAME, "img").send_keys("C:/Users/JorgeFerreira/Pictures/spider-man.jpg") 
time.sleep(1)

inputField = driver.find_element(By.NAME, "first_name")
inputField.clear()
inputField.send_keys("Selenium")
time.sleep(1)
inputField = driver.find_element(By.NAME, "last_name")
inputField.clear()
inputField.send_keys("Teste")
time.sleep(1)
inputField = driver.find_element(By.NAME, "username")
inputField.clear()
inputField.send_keys("usuario selenium")
time.sleep(1)

# Botao salvar
driver.find_element(By.XPATH, '//*[@id="root"]/div/main/div[1]/form/div[3]/button[1]').click()
time.sleep(1)

# Botão editar perfil
driver.find_element(By.XPATH, '//*[@id="root"]/div/main/div/div[1]/div/div/button').click()
time.sleep(3)


elemento = driver.find_element(By.XPATH, '//*[@id="root"]/div/main/div[1]/form')  
driver.execute_script("arguments[0].scrollTop = 500;", elemento)  # Rola para 500 pixels

time.sleep(3)

# Botão cancelar
driver.find_element(By.XPATH, '//*[@id="root"]/div/main/div[1]/form/div[3]/button[2]').click()
time.sleep(1)

# Aguarde alguns segundos para visualizar o resultado
time.sleep(5)
input("Pressione Enter para finalizar...")
# Feche o navegador
driver.quit()
