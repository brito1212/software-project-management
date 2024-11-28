from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import Select
import time


class MidiaAutomation:
    def __init__(self, driver=None) -> None:
        self.driver = webdriver.Firefox() if driver is None else driver

    def rotina_de_adicao_de_tag(self, tags: list[str], selector_name: str, driver=None) -> None:
        if driver is None:
            driver = self.driver
        
        # Localiza o select desejado e cria uma instância do Select para ele
        selector = Select(driver.find_element(By.CSS_SELECTOR, selector_name))
        
        # Rola o elemento pai e seleciona os itens desejados
        for option in selector.options:
            if option.text in tags:
                # Rola até a opção desejada e clica nela
                driver.execute_script("arguments[0].scrollIntoView();", option)
                option.click()
                time.sleep(0.3)  # Pequena pausa para garantir a seleção

    def fill_form(self, values: dict) -> None:

        # Preenche os campos do formulário
        for key in values.keys():
            if key == 'genres' or key == 'platforms':
                continue
            label = self.driver.find_element(By.NAME, key)
            label.clear()
            label.send_keys(values[key])

        # Seleciona a data atual
        self.driver.find_element(By.XPATH, "//a[text()='Now']").click()

        # Seleciona as tags de gêneros e plataformas separadamente
        self.rotina_de_adicao_de_tag(values['genres'], 'select[name="genres"]')
        self.rotina_de_adicao_de_tag(values['platforms'], 'select[name="platforms"]')

    def view_element(self, table:str, identifier:str) -> None:
        # Abre a página que exibe a lista de jogos
        self.driver.find_element(By.CSS_SELECTOR, f'a[href="/admin/midia/{table}/"]').click()

        # Seleciona o elemento especificado na tabela
        self.driver.find_element(By.XPATH, identifier).click()
