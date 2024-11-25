from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import Select
from selenium.webdriver.common.by import By
import time

driver = webdriver.Firefox()

username = 'admin@admin.com'
password = 'admin'

# Abrindo o django admin e o preenchendo os campos de login
driver.get('http://localhost:8000/admin/')
driver.find_element(By.NAME, 'username').send_keys(username)
driver.find_element(By.NAME, 'password').send_keys(password)

time.sleep(2)

# Clica no botão de login
driver.find_element(By.XPATH, '//input[@type="submit" and @value="Log in"]').click()

time.sleep(5)
# Abre a página que exibe a lista de reviews
driver.find_element(By.CSS_SELECTOR, 'a[href="/admin/review/review/"]').click()
time.sleep(5)

# Seleciona o elemento especificado na tabela
driver.find_element(By.CSS_SELECTOR, 'a[href="/admin/review/review/8/change/"]').click()
time.sleep(3)
# Preenche os campos do formulário
driver.find_element(By.NAME, 'title').clear()
driver.find_element(By.NAME, 'title').send_keys('Review editada')
driver.find_element(By.NAME, 'content').clear()
driver.find_element(By.NAME, 'content').send_keys('Conteúdo editado')

# Alterando os seletores
select = Select(driver.find_element(By.NAME, 'rate'))
select.select_by_visible_text('Five')
select = Select(driver.find_element(By.NAME, 'midia'))
select.select_by_visible_text('Selenium Test')
select = Select(driver.find_element(By.NAME, 'user'))
select.select_by_visible_text('admin@admin.com')

time.sleep(3)

# Clica no botão de salvar
driver.find_element(By.NAME, '_save').click()
time.sleep(3)

driver.quit()