'''
    This file is responsible for testing request RF07 – Inserting Media into the system
'''

import dependencies_test.midia_automation as midia
import time
import datetime
from dependencies_test.tags_automation import login_admin
from selenium.webdriver.common.by import By

test = midia.MidiaAutomation()

# Realiza o login como admin
login_admin(test)

# Abre a página de adição de jogos
table = 'game'
test.driver.find_element(By.XPATH, f'a[href="/admin/midia/{table}/add/"]').click()

# Preenche os campos
today = datetime.date.today().strftime("%Y-%m-%d")

values = {
    'title': 'Selenium Test',
    'publish_date': today,
    'description': f'Test to RF07 - {today}',
    'studio': 'Visual Studio Code',
    'banner': 'www.selenium.test.py',
    'publisher': 'Python',
    'release_date': today,
    'avarage_price': '1,99',
    'genres': ["Ação", "Romance", "Aventura", "Retro"],
    'platforms': ["Steam", "PC", "Battle.net"]
}

test.fill_form(values)

# Salva os dados
test.driver.find_element(By.NAME, '_save').click()

# Aguarda alguns segundos para visualizar o resultado e finaliza o navegador
time.sleep(2)
input("Pressione Enter para finalizar...")

test.driver.quit()