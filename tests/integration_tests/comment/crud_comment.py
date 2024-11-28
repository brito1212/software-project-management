'''
This test is responsible for testing the CRUD of Comments into reviews -- With the exception of updating, which is not allowed.
'''

from selenium import webdriver
from selenium.webdriver.common.by import By
import time
from selenium.webdriver.common.action_chains import ActionChains

driver = webdriver.Firefox()

# Abrindo a tela de login
driver.get('http://localhost:3000/login')
time.sleep(1)

# Preenchendo os campos de login
labels = driver.find_element(By.ID, 'email').send_keys('admin@admin.com')
driver.find_element(By.ID, 'password').send_keys('admin')
time.sleep(1)

# Clica no botão de login
driver.find_element(By.CSS_SELECTOR, 'button[class="btn primary btn-form"]').click()
time.sleep(2)

# Abrindo a tela de midias:
driver.get('http://localhost:3000/midia/movie/11')
time.sleep(2)

# Role até o final da página
driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
time.sleep(1)

# Clica no botão para adicionar review
driver.find_element(By.CLASS_NAME, '_add_comment_link_u1x70_99').click()

# Preenchendo os campos do comment:
driver.find_element(By.CLASS_NAME, '_textarea_1j3m5_25').send_keys('Lorem Ipsum dolor sit amet consectetur adipiscing elit')
time.sleep(3)

# Clica no botão de salvar
driver.find_element(By.CSS_SELECTOR, 'button[class="btn primary undefined"]').click()
time.sleep(2)

driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
time.sleep(3)

# Clica no botão de apagar review
# driver.find_element(By.CSS_SELECTOR, 'i[class="fa-solid fa-trash-can _trash_icon_updco_75"]').click()
# time.sleep(3)
# driver.find_element(By.CSS_SELECTOR, 'button[class="btn primary-red"]').click()
# time.sleep(2)

# driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
# time.sleep(3)

driver.quit()