'''
    This file is responsible for testing request RF09 – Change Media in the system
'''

import dependencies_test.midia_automation as midia
import time
import datetime
from dependencies_test.tags_automation import login_admin
from selenium.webdriver.common.by import By

test = midia.MidiaAutomation()

# Realiza o login como admin
login_admin(test)

# Seleciona um elemento da tabela
text_element = 'Selenium Test'
test.view_element('game', f'//a[text()="{text_element}"]')

# Preenche os campos
today = datetime.date.today().strftime("%Y-%m-%d")

values = {
    'title': 'Selenium Test - Updated',
    'publish_date': today,
    'description': f'Test to RF09 - {today}',
    'studio': 'VScode',
    'banner': 'www.python.test.py/selenium',
    'publisher': 'Selenium',
    'release_date': today,
    'avarage_price': '5,89',
    'genres': ["Terror", "Retro"], # Como Retro já havia sido selecionado, ele deve ser retirado das tags
    'platforms': ["Steam", "Epic Games", "Battle.net"]
}

test.fill_form(values)

# Salva os dados
test.driver.find_element(By.NAME, '_save').click()

# Aguarda alguns segundos para visualizar o resultado e finaliza o navegador
time.sleep(2)
input("Pressione Enter para finalizar...")

test.driver.quit()
