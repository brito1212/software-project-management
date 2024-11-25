'''
This test is responsible for testing the CRUD of reviews -- With the exception of updating, which is not allowed.
'''

from selenium import webdriver
from selenium.webdriver.common.by import By
import time
from selenium.webdriver.common.action_chains import ActionChains

driver = webdriver.Firefox()

# Abrindo a tela de login
driver.get('http://localhost:3000/login')
time.sleep(2)

# Preenchendo os campos de login
labels = driver.find_element(By.ID, 'email').send_keys('admin@admin.com')
driver.find_element(By.ID, 'password').send_keys('admin')
time.sleep(2)

# Clica no botão de login
driver.find_element(By.CSS_SELECTOR, 'button[class="btn primary btn-form"]').click()
time.sleep(5)

# Abrindo a tela de midias:
driver.get('http://localhost:3000/midia/movie/11')
time.sleep(2)

# Role até o final da página
driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
time.sleep(1)

# Clica no botão para adicionar review
driver.find_element(By.CLASS_NAME, '_review_button_dni39_131').click()

# Localize o contêiner das estrelas
rating_container = driver.find_element(By.CLASS_NAME, "style-module_starRatingWrap__q-lJC")

time.sleep(2)

driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
time.sleep(2)

# Preenchendo os campos do review:

# Selecionando a nota
nota = 5 # Nota desejada 
estrela = rating_container.find_elements(By.CLASS_NAME, "star-svg")[nota - 1]
action = ActionChains(driver)
action.move_to_element(estrela).click().perform()

# Preenchendo os labels
driver.find_element(By.ID, 'title').send_keys('Lorem Ipsum')
driver.find_element(By.CLASS_NAME, '_textarea_195o7_11').send_keys('Lorem Ipsum dolor sit amet consectetur adipiscing elit')

time.sleep(3)

# Clica no botão de salvar
driver.find_element(By.CSS_SELECTOR, 'button[class="btn primary _button_195o7_79"]').click()
time.sleep(2)

driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
time.sleep(3)

# Clica no botão de apagar review
driver.find_element(By.CSS_SELECTOR, 'i[class="fa-solid fa-trash-can _trash_icon_1ajy5_75"]').click()
time.sleep(3)
driver.find_element(By.CSS_SELECTOR, 'button[class="btn primary-red"]').click()
time.sleep(2)

driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
time.sleep(3)

driver.quit()