"""
    The class TagsInsertion is responsible for test the insertion tags in the system.
    The method populate_teble is responsible for inserting tags in the tables Platformss and Genress.
"""

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import Select
import time

def login_admin(self) -> None:
    # Abrindo o django admin
    self.driver.get("http://localhost:8000/admin/")

    time.sleep(2)  # Aguarde 2 segundos para abrir o browser

    # Preenche os campos de login
    self.driver.find_element(By.NAME, "username").send_keys("admin@admin.com")
    self.driver.find_element(By.NAME, "password").send_keys("admin")

    # Clica no botão de login
    self.driver.find_element(By.XPATH, '//input[@type="submit" and @value="Log in"]').click()


class TagsAutomation:
    def __init__(self, driver = None) -> None:
        self.driver = webdriver.Firefox() if driver is None else driver

    def insert_tag(self, value: str|int, **kwargs) -> None:
       
        driver = self.driver if 'driver' not in kwargs else kwargs['driver']
        selector = Select(self.driver.find_element(By.NAME, "name"))

        if type(value) is int:
            current_option = selector.options[value]
            # Extrai o valor do atributo `value` da opção atual
            option_value = current_option.get_attribute("value")
        elif type(value) is str:
            option_value = value

        selector.select_by_value(option_value)

        buttom = '_save' if 'buttom' not in kwargs else kwargs['buttom']
        driver.find_element(By.NAME, buttom).click()
        
        time.sleep(1)

    def populate_teble(self, href: str):
        # Clique no botão add do href
        self.driver.find_element(By.CSS_SELECTOR, href).click()
        time.sleep(1)

        selector = Select(self.driver.find_element(By.NAME, "name"))
        values = selector.options  # Obter todas as opções inicialmente

        for i in range(1, len(values) - 1):
            # Atualiza o seletor e as opções a cada iteração
            self.insert_tag(i, buttom="_addanother")
            time.sleep(1)  # Pequeno delay para garantir o processamento no servidor

        # Inserir o último valor usando o botão "Salvar"
        self.insert_tag(-1, buttom='_save')
