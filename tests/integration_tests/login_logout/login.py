from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time


driver = webdriver.Chrome()

# Abra a página de login
driver.get("http://localhost:3000")
wait = WebDriverWait(driver, 10)  # Espera até 10 segundos para os elementos carregarem

time.sleep(1) 

# Clique no botão de login
login_button = wait.until(EC.element_to_be_clickable((By.XPATH, '//*[@id="root"]/div/header/div[2]/a[1]')))
login_button.click()

# Preencha os campos de login
driver.find_element(By.NAME, "email").send_keys("teste@teste.com")
driver.find_element(By.NAME, "password").send_keys("#Abcd1234")
time.sleep(1)

# Botão para logar
login_submit_button = wait.until(EC.element_to_be_clickable((By.XPATH, '/html/body/div/div/main/section/section/form/button')))
login_submit_button.click()

# Espera trocar a página
wait.until(EC.presence_of_element_located((By.XPATH, '//*[@id="root"]/div/header/div[2]/button')))

time.sleep(3) # para mostrar que o login foi feito

# Botão logout
logout_button = wait.until(EC.element_to_be_clickable((By.XPATH, '//*[@id="root"]/div/header/div[2]/button')))
logout_button.click()


wait.until(EC.url_contains("localhost:3000"))

time.sleep(3)
input("Pressione Enter para finalizar...")
driver.quit()
