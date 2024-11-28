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

time.sleep(2)
# Abre a página que exibe a lista de reviews
driver.find_element(By.CSS_SELECTOR, 'a[href="/admin/comment/comment/"]').click()
time.sleep(5)

# Seleciona o elemento especificado na tabela
comment = 'Lorem Ipsum dolor sit amet consectetur adipiscing elit'
driver.find_element(By.XPATH, f'//a[text()="{comment}"]').click()
time.sleep(3)

# Preenche os campos do formulário
driver.find_element(By.NAME, 'content').clear()
driver.find_element(By.NAME, 'content').send_keys('Conteúdo editado')

# Alterando os seletores
titulo_review = 'Lorem Ipsum'
select = Select(driver.find_element(By.NAME, 'review'))
select.select_by_visible_text(titulo_review)
select = Select(driver.find_element(By.NAME, 'user'))
select.select_by_visible_text('email@teste.com')

time.sleep(3)

# Clica no botão de salvar
driver.find_element(By.NAME, '_save').click()
time.sleep(3)

driver.quit()
