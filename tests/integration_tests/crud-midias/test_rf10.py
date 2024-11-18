'''
    This file is responsible for testing request RF10 – Remove Media in the system
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
text_element = 'Selenium Test - Updated'
test.view_element('game', f'//a[text()="{text_element}"]')

test.driver.find_element(By.CLASS_NAME, 'deletelink').click()
test.driver.find_element(By.XPATH, '//input[@value="Yes, I’m sure"]').click()

# Aguarda alguns segundos para visualizar o resultado e finaliza o navegador
time.sleep(2)
input("Pressione Enter para finalizar...")

test.driver.quit()